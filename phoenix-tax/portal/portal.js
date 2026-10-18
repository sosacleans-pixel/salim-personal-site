/* Phoenix Tax portal DEMO.
   Nothing here talks to a server. Files are never read, uploaded or stored:
   only their name and size are listed in memory and dropped on sign out or page exit. */
(function(){
  var es={
    back:"Volver al sitio",demoTag:"DEMO",demoBanner:"Solo es una demostración. No suba documentos reales todavía.",
    siTitle:"Entre a su portal",siLead:"Escriba su correo y le enviaremos un enlace seguro para entrar. No necesita contraseña.",
    siEmail:"Correo electrónico",siSend:"Enviarme un enlace de acceso",siNote:"Demostración: no se envía ningún correo ni se crea ninguna cuenta.",
    sentTitle:"Revise su correo",sentLead:"En el portal real, enviaríamos un enlace de acceso de un solo uso a",
    sentNote:"Esto es una demostración, así que no se envió nada. Continúe para explorar el panel.",
    sentOpen:"Abrir el panel de demostración",sentOther:"Usar otro correo",
    dEyebrow:"Portal del cliente",dTitle:"Le damos la bienvenida",dYear:"Año fiscal",dSignout:"Cerrar sesión",dStatus:"Estado de la declaración",
    dChecklist:"Lista de documentos",
    stCollect:"Reuniendo documentos",stPrep:"En preparación",stReady:"Lista para revisión",stFiled:"Presentada",
    trAccount:"Cuenta",trDocs:"Documentos",trPrep:"Preparando",trReview:"Revisión",trFiled:"Presentada",
    noteCollect:"Suba los documentos que faltan en su lista. Le avisaremos cuando empecemos a preparar su declaración.",
    noteReady:"Su declaración está lista. Revise el resumen y apruébela cuando esté conforme.",
    noteFiled:"Esta declaración ya se presentó. Su copia queda guardada aquí.",
    of:"de",received:"recibidos",
    sReceived:"Recibido",sNeeded:"Falta",sReview:"En revisión",sNA:"No aplica",
    dW2:"W-2 del empleador",d1099nec:"1099-NEC",d1099int:"1099-INT de intereses bancarios",d1098:"1098 de intereses hipotecarios",
    dPrior:"Declaración del año anterior",dID:"Identificación con foto",dSSN:"Tarjetas de Seguro Social",dBank:"Datos bancarios para depósito directo",d1095:"1095-A del Mercado",
    rTitle:"Revisar y aprobar",
    rTextReady:"Su declaración del año {y} está lista para revisión. Revise el resumen y luego firme el Formulario 8879 para autorizar la presentación electrónica.",
    rTextWait:"Cuando su declaración esté lista para revisión, aparecerá aquí.",
    rTextFiled:"Su declaración del año {y} fue aprobada y presentada.",
    rFiling:"Estado civil",rFilingV:"Soltero/a",rForms:"Formularios incluidos",rState:"Declaración estatal",rStateV:"Incluida",
    rView:"Ver resumen",rHide:"Ocultar resumen",rApprove:"Aprobar y firmar el Formulario 8879",
    rDemo:"Demostración: no se firmó ni se presentó nada.",
    uTitle:"Subir documentos",uDrop:"Arrastre y suelte sus archivos aquí",uOr:"o toque para elegir fotos o PDF",
    uNote:"Demostración: los archivos se quedan en este navegador y se descartan al salir. No se sube ni se guarda nada.",
    uClear:"Descartar todos los archivos",uLocal:"Solo en este navegador",uRemove:"Quitar",
    mTitle:"Mensajes seguros",mPh:"Escriba un mensaje",mSend:"Enviar",mNote:"Demostración: los mensajes no se envían a ningún lado.",
    mTeam:"Equipo de Phoenix Tax",mYou:"Usted",
    m1:"¡Hola! Le damos la bienvenida a su portal. Use la lista de documentos para ver qué necesitamos este año.",
    m2:"Gracias, ya subí mi W-2 y mi 1099.",
    m3:"Perfecto, los recibimos. Le avisaremos aquí cuando su declaración esté lista para revisión.",
    mDemoReply:"(Demostración) En el portal real, el equipo vería su mensaje aquí.",
    disc:"Phoenix Tax no es un bufete de abogados y no ofrece asesoría legal. Los servicios de creación de empresas son de preparación de documentos y ayuda con trámites."
  };
  var en={
    stCollect:"Collecting documents",stPrep:"Preparing",stReady:"Ready for review",stFiled:"Filed",
    trAccount:"Account",trDocs:"Documents",trPrep:"Preparing",trReview:"Review",trFiled:"Filed",
    noteCollect:"Upload the documents still missing from your checklist. We will let you know when we start preparing your return.",
    noteReady:"Your return is ready. Look over the summary and approve it when you are comfortable.",
    noteFiled:"This return has been filed. Your copy stays here.",
    of:"of",received:"received",
    sReceived:"Received",sNeeded:"Needed",sReview:"In review",sNA:"Not needed",
    dW2:"W-2 from employer",d1099nec:"1099-NEC",d1099int:"1099-INT bank interest",d1098:"1098 mortgage interest",
    dPrior:"Prior-year return",dID:"Photo ID",dSSN:"Social Security cards",dBank:"Bank info for direct deposit",d1095:"1095-A from the Marketplace",
    rTextReady:"Your {y} return is ready for review. Look over the summary, then sign Form 8879 to authorize e-filing.",
    rTextWait:"When your return is ready for review, it will show up here.",
    rTextFiled:"Your {y} return was approved and filed.",
    rHide:"Hide summary",rDemo:"Demo: nothing was signed or filed.",
    uLocal:"In this browser only",uRemove:"Remove",
    mTeam:"Phoenix Tax team",mYou:"You",
    m1:"Hi! Welcome to your portal. Use the document checklist to see what we need this year.",
    m2:"Thanks, I just uploaded my W-2 and 1099.",
    m3:"Great, we got them. We will message you here when your return is ready for review.",
    mDemoReply:"(Demo) In the real portal, the team would see your message here."
  };
  var i=window.PTI18N(es,en),t=i.t;
  var $=function(id){return document.getElementById(id);};

  var DATA={
    "2026":{status:"collect",step:1,docs:[["dW2","needed"],["d1099nec","needed"],["d1099int","needed"],["d1098","needed"],["dPrior","received"],["dID","received"],["dSSN","received"],["dBank","needed"]]},
    "2025":{status:"ready",step:3,docs:[["dW2","received"],["d1099nec","received"],["d1099int","received"],["d1098","received"],["dPrior","received"],["dID","received"],["dSSN","received"],["dBank","received"],["d1095","na"]]},
    "2024":{status:"filed",step:5,docs:[["dW2","received"],["d1099nec","received"],["d1098","received"],["dPrior","received"],["dID","received"],["dSSN","received"],["dBank","received"]]}
  };
  var ST={collect:["stCollect","pill-wait","noteCollect"],prep:["stPrep","pill-rev","noteCollect"],ready:["stReady","pill-ready","noteReady"],filed:["stFiled","pill-ok","noteFiled"]};
  var DS={received:["sReceived","pill-ok"],needed:["sNeeded","pill-need"],review:["sReview","pill-rev"],na:["sNA","pill-wait"]};
  var TRACK=["trAccount","trDocs","trPrep","trReview","trFiled"];
  var files=[],msgs=[],showSummary=false,approved=false;

  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}

  function render(){
    var y=$("year").value,d=DATA[y],s=ST[d.status];
    $("statusTitle").textContent=t("dYear")+" "+y;
    var p=$("statusPill");p.className="pill "+s[1];p.textContent=t(s[0]);
    $("statusNote").textContent=t(s[2]);
    var tr=$("track");tr.innerHTML="";
    TRACK.forEach(function(k,n){
      var li=el("li",n<d.step?"done":(n===d.step?"now":""));
      li.appendChild(el("span","dot"));li.appendChild(el("span","tl",t(k)));tr.appendChild(li);
    });
    var ul=$("doclist");ul.innerHTML="";var got=0,need=0;
    d.docs.forEach(function(r){
      var ds=DS[r[1]];if(r[1]!=="na"){need++;if(r[1]==="received")got++;}
      var li=el("li","doc "+r[1]);
      li.appendChild(el("span","ico"));li.appendChild(el("span","dn",t(r[0])));
      li.appendChild(el("span","pill "+ds[1],t(ds[0])));ul.appendChild(li);
    });
    $("ckCount").textContent=got+" "+t("of")+" "+need+" "+t("received");
    var ready=d.status==="ready";
    $("reviewText").textContent=t(ready?"rTextReady":(d.status==="filed"?"rTextFiled":"rTextWait")).replace("{y}",y);
    $("viewSummary").hidden=!ready&&d.status!=="filed";
    $("approve").hidden=!ready;
    $("summary").hidden=!(showSummary&&(ready||d.status==="filed"));
    $("viewSummary").textContent=t(showSummary?"rHide":"rView");
    $("approveMsg").hidden=!(approved&&ready);$("approveMsg").textContent=t("rDemo");
    renderFiles();renderThread();
  }
  function fmt(b){return b<1024?b+" B":b<1048576?(b/1024).toFixed(0)+" KB":(b/1048576).toFixed(1)+" MB";}
  function renderFiles(){
    var ul=$("files");ul.innerHTML="";
    files.forEach(function(f,n){
      var li=el("li","file");
      var info=el("div","fi");info.appendChild(el("strong",null,f.name));info.appendChild(el("span",null,fmt(f.size)+" · "+t("uLocal")));
      var b=el("button","linkbtn",t("uRemove"));b.type="button";b.onclick=function(){files.splice(n,1);renderFiles();};
      li.appendChild(info);li.appendChild(b);ul.appendChild(li);
    });
    $("clearFiles").hidden=!files.length;
  }
  function renderThread(){
    var th=$("thread");th.innerHTML="";
    var base=[["team","m1"],["you","m2"],["team","m3"]];
    base.concat(msgs).forEach(function(m){
      var mine=m[0]==="you",b=el("div","msg "+(mine?"me":"them"));
      b.appendChild(el("span","who",t(mine?"mYou":"mTeam")));
      b.appendChild(el("p",null,m[2]!=null?m[2]:t(m[1])));th.appendChild(b);
    });
    th.scrollTop=th.scrollHeight;
  }
  function addFiles(list){
    // Only the name and size are kept in memory. File contents are never read.
    Array.prototype.forEach.call(list||[],function(f){files.push({name:f.name,size:f.size});});
    $("fileInput").value="";renderFiles();
  }
  function show(view){
    $("signin").hidden=view!=="signin";$("dash").hidden=view!=="dash";
    if(view==="dash")render();
    window.scrollTo(0,0);
  }

  $("signinForm").addEventListener("submit",function(e){
    e.preventDefault();var em=$("email");if(!em.reportValidity())return;
    $("sentTo").textContent=em.value;$("stepEmail").hidden=true;$("stepSent").hidden=false;
  });
  $("useOther").onclick=function(){$("stepSent").hidden=true;$("stepEmail").hidden=false;};
  $("openDash").onclick=function(){history.replaceState(null,"","#dashboard");show("dash");};
  $("signout").onclick=function(){files=[];msgs=[];approved=false;showSummary=false;$("email").value="";$("stepSent").hidden=true;$("stepEmail").hidden=false;history.replaceState(null,"",location.pathname);show("signin");};
  $("year").onchange=function(){showSummary=false;approved=false;render();};
  $("viewSummary").onclick=function(){showSummary=!showSummary;render();};
  $("approve").onclick=function(){approved=true;render();};
  var drop=$("drop");
  ["dragenter","dragover"].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add("over");});});
  ["dragleave","drop"].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.remove("over");});});
  drop.addEventListener("drop",function(e){addFiles(e.dataTransfer&&e.dataTransfer.files);});
  drop.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();$("fileInput").click();}});
  /* Stop the browser from opening a file dropped outside the zone. */
  window.addEventListener("dragover",function(e){e.preventDefault();});
  window.addEventListener("drop",function(e){e.preventDefault();});
  $("fileInput").addEventListener("change",function(){addFiles(this.files);});
  $("clearFiles").onclick=function(){files=[];renderFiles();};
  window.addEventListener("pagehide",function(){files=[];});
  $("composer").addEventListener("submit",function(e){
    e.preventDefault();var v=$("msgInput").value.trim();if(!v)return;
    msgs.push(["you",null,v]);msgs.push(["team","mDemoReply"]);$("msgInput").value="";renderThread();
  });
  i.onChange(function(){if(!$("dash").hidden)render();});
  show(location.hash==="#dashboard"?"dash":"signin");
})();
