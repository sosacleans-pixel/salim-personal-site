/* Contact form: posts JSON to a Supabase Edge Function that stores the message and emails Salim.
   No email address or secret is present in this file. */
(()=>{const f=document.getElementById('contact-form');if(!f)return;
const t0=Date.now(),st=f.querySelector('.f-status'),btn=f.querySelector('button[type=submit]');
const say=(m,c)=>{st.textContent=m;st.className='f-status'+(c?' '+c:'')};
f.addEventListener('submit',async e=>{e.preventDefault();
  const d=Object.fromEntries(new FormData(f).entries());
  for(const k of ['name','email','phone','message','company'])d[k]=(d[k]||'').trim();
  if(!d.name||!d.message){say('Please add your name and a message.','err');return}
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){say('Please enter a valid email address.','err');f.email.focus();return}
  d.elapsed_ms=Date.now()-t0;btn.disabled=true;say('Sending…');
  try{const r=await fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.ok){f.reset();say('Thank you. Your message is on its way, and I will get back to you soon.','ok')}
    else say(j.error||'Something went wrong. Please try again later.','err')}
  catch(_){say('Could not send right now. Please try again later.','err')}
  finally{btn.disabled=false}});
})();
