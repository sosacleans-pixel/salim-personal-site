(function(){
  var es={
    navServices:"Servicios",navHow:"Cómo funciona",navGallery:"Galería",navFaq:"Preguntas",navQuote:"Cotizar",
    heroEyebrow:"Fiestas · Cumpleaños · Eventos",
    heroTitle:"Decoración que hace brillar cada celebración.",
    heroLead:"Guirnaldas y arcos de globos, fondos personalizados, montajes de mesa y decoración de temporada, diseñados e instalados para tu gran día.",
    heroCta:"Solicitar cotización",heroCta2:"Ver servicios",
    svcEyebrow:"Lo que hacemos",svcTitle:"Decoración para cada motivo de celebración",
    s1t:"Cumpleaños",s1d:"Paredes de globos temáticas, mesas de postres y rincones para fotos para niños y adultos.",
    s2t:"Días festivos",s2d:"Navidad, Halloween, San Valentín y más. Decoración de temporada para hogares, tiendas y oficinas.",
    s3t:"Baby showers y revelaciones de género",s3d:"Colores suaves, detalles tiernos y grandes momentos de revelación que todos recordarán.",
    s4t:"Bodas y eventos",s4d:"Montajes elegantes para bodas, quinceañeras, graduaciones, eventos corporativos y fiestas.",
    s5t:"Guirnaldas y arcos de globos",s5d:"Guirnaldas orgánicas, arcos clásicos y columnas en los colores que elijas.",
    s6t:"Fondos personalizados",s6d:"Paneles, telas, letreros estilo neón y detalles florales para fondos perfectos para fotos.",
    howEyebrow:"Cómo funciona",howTitle:"Tres pasos sencillos para un montaje increíble",
    h1t:"Cuéntanos tu idea",h1d:"Comparte el tipo de evento, la fecha, los colores y el tema en el formulario.",
    h2t:"Recibe tu diseño",h2d:"Te contactamos con ideas y una cotización personalizada para tu celebración.",
    h3t:"Nosotros lo montamos",h3d:"Llegamos, instalamos todo y tú solo disfrutas la fiesta.",
    galEyebrow:"Galería",galTitle:"Fotos muy pronto",galLead:"Pronto publicaremos aquí nuestro portafolio de eventos reales.",galPh:"Fotos muy pronto",
    qEyebrow:"Solicitar cotización",qTitle:"Planeemos algo inolvidable",qLead:"Cuéntanos sobre tu evento y te responderemos con ideas y una cotización personalizada.",
    fName:"Nombre",fEmail:"Correo",fPhone:"Teléfono",fDate:"Fecha del evento",fType:"Tipo de evento",oChoose:"Elige una opción",oOther:"Otro",
    fDetails:"Detalles",fDetailsPh:"Tema, colores, lugar, número de invitados, lo que debamos saber",
    fSubmit:"Enviar solicitud",fNote:"Las solicitudes de cotización en línea llegarán pronto.",
    faqEyebrow:"Preguntas",faqTitle:"Preguntas frecuentes",
    q1:"¿Con cuánta anticipación debo reservar?",a1:"Mientras antes mejor, sobre todo en temporada de fiestas. Escríbenos en cuanto tengas fecha y confirmamos disponibilidad.",
    q2:"¿Ustedes montan y desmontan?",a2:"Sí. Nos encargamos de la instalación, y el desmontaje se puede incluir en tu cotización.",
    q3:"¿Pueden usar mi tema o mis colores?",a3:"Claro que sí. Comparte tus colores, tema o fotos de inspiración y diseñamos a partir de ellos.",
    q4:"¿Qué debo incluir en mi solicitud?",a4:"El tipo de evento, la fecha, el lugar, los colores o el tema, el número de invitados y fotos de inspiración. Mientras más sepamos, mejor podremos planear.",
    q5:"¿Cuánto cuesta?",a5:"Cada evento es diferente, así que damos una cotización personalizada según el tamaño, el diseño y la ubicación. Solicita una cotización para empezar.",
    fTag:"Decoración para días festivos, cumpleaños y eventos.",
    msg:"¡Gracias! Las solicitudes de cotización en línea llegarán pronto."
  };
  var en={msg:"Thanks! Online quote requests are coming soon."};
  var nodes=document.querySelectorAll("[data-i18n]");
  nodes.forEach(function(n){en[n.dataset.i18n]=n.textContent;});
  var ph=document.querySelectorAll("[data-i18n-ph]");
  ph.forEach(function(n){en[n.dataset.i18nPh]=n.placeholder;});
  var lang="en",btn=document.getElementById("langBtn");
  function apply(l){
    var d=l==="es"?es:en;lang=l;
    nodes.forEach(function(n){var v=d[n.dataset.i18n];if(v)n.textContent=v;});
    ph.forEach(function(n){var v=d[n.dataset.i18nPh];if(v)n.placeholder=v;});
    document.documentElement.lang=l;
    btn.textContent=l==="es"?"EN":"ES";
    btn.setAttribute("aria-label",l==="es"?"Switch to English":"Cambiar a español");
  }
  btn.addEventListener("click",function(){apply(lang==="en"?"es":"en");});
  var f=document.getElementById("quoteForm"),m=document.getElementById("formMsg");
  // Never submits or sends data anywhere; only shows a message.
  f.addEventListener("submit",function(e){e.preventDefault();});
  document.getElementById("quoteBtn").addEventListener("click",function(){
    if(!f.reportValidity())return;
    m.textContent=(lang==="es"?es:en).msg;m.hidden=false;f.reset();
  });
})();
