// Supabase Edge Function: personal-site-contact
// Receives the salimheyaime.com contact form, stores it in public.personal_site_contacts
// (insert-only RLS, using the anon key) and emails a notification via Resend.
// The destination address is a server-side secret (CONTACT_TO), never in the website HTML or this file.
// Secrets used: CONTACT_TO, RESEND_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY.
// Deploy with verify_jwt = false (public form endpoint).

const TO = Deno.env.get("CONTACT_TO") ?? ""; // set as a project secret so the address is never in public code
const FROM = "Salim Heyaime website <no-reply@coachsalimheyaime.com>";
const ALLOWED = [
  "https://salimheyaime.com",
  "https://www.salimheyaime.com",
  "https://sosacleans-pixel.github.io",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
];

const env = (k: string) => Deno.env.get(k) ?? "";
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

function cors(origin: string | null) {
  const o = origin && ALLOWED.includes(origin) ? origin : ALLOWED[0];
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Vary": "Origin",
  };
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");
  const h = { ...cors(origin), "Content-Type": "application/json" };
  const reply = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: h });

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(origin) });
  if (req.method !== "POST") return reply(405, { ok: false, error: "Method not allowed" });
  if (origin && !ALLOWED.includes(origin)) return reply(403, { ok: false, error: "Origin not allowed" });

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return reply(400, { ok: false, error: "Invalid request" }); }

  const s = (k: string, max: number) => String(b[k] ?? "").trim().slice(0, max);
  // Honeypot: real visitors never fill "company". Pretend success so bots learn nothing.
  if (s("company", 200)) return reply(200, { ok: true });
  // Submitted implausibly fast after page load -> treat as bot.
  const elapsed = Number(b["elapsed_ms"] ?? 0);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 2500) return reply(200, { ok: true });

  const name = s("name", 120), email = s("email", 200), phone = s("phone", 40), message = s("message", 5000);
  if (!name || !message) return reply(400, { ok: false, error: "Please add your name and a message." });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return reply(400, { ok: false, error: "Please enter a valid email address." });
  const ua = (req.headers.get("user-agent") ?? "").slice(0, 400);

  const ins = await fetch(`${env("SUPABASE_URL")}/rest/v1/personal_site_contacts`, {
    method: "POST",
    headers: {
      apikey: env("SUPABASE_ANON_KEY"),
      Authorization: `Bearer ${env("SUPABASE_ANON_KEY")}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ name, email, phone: phone || null, message, source: "salimheyaime.com", user_agent: ua || null }),
  });
  if (!ins.ok) {
    console.error("insert failed", ins.status, await ins.text());
    return reply(500, { ok: false, error: "Something went wrong. Please try again later." });
  }

  const html = `<h2 style="font-family:Georgia,serif">New message from salimheyaime.com</h2>
<p><strong>Name:</strong> ${esc(name)}<br><strong>Email:</strong> ${esc(email)}${phone ? `<br><strong>Phone:</strong> ${esc(phone)}` : ""}</p>
<p style="white-space:pre-wrap">${esc(message)}</p>`;
  const text = `New message from salimheyaime.com\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ""}\n\n${message}`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env("RESEND_API_KEY")}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `Website contact: ${name}`.slice(0, 150), html, text }),
  });
  if (!TO) console.error("CONTACT_TO secret missing");
  if (!r.ok) {
    // Message is already saved in the table; log and still tell the visitor it was received.
    console.error("resend failed", r.status, await r.text());
  }
  return reply(200, { ok: true });
});
