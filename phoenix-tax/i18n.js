/* Phoenix Tax: tiny EN/ES toggle shared by the site and the portal demo. */
(function(){
  var KEY="pt-lang";
  window.PTI18N=function(es,enExtra){
    var en=Object.assign({},enExtra||{});
    var nodes=[],ph=[],lang="en",subs=[];
    function scan(){
      document.querySelectorAll("[data-i18n]").forEach(function(n){
        if(!n.__pt){n.__pt=1;nodes.push(n);if(!(n.dataset.i18n in en))en[n.dataset.i18n]=n.textContent;}
      });
      document.querySelectorAll("[data-i18n-ph]").forEach(function(n){
        if(!n.__ptp){n.__ptp=1;ph.push(n);if(!(n.dataset.i18nPh in en))en[n.dataset.i18nPh]=n.placeholder;}
      });
    }
    var btn=document.getElementById("langBtn");
    function t(k){var d=lang==="es"?es:en;return d[k]!=null?d[k]:(en[k]!=null?en[k]:k);}
    function apply(l){
      lang=l;scan();
      nodes.forEach(function(n){n.textContent=t(n.dataset.i18n);});
      ph.forEach(function(n){n.placeholder=t(n.dataset.i18nPh);});
      document.documentElement.lang=l;
      if(btn){btn.textContent=l==="es"?"EN":"ES";btn.setAttribute("aria-label",l==="es"?"Switch to English":"Cambiar a español");}
      try{localStorage.setItem(KEY,l);}catch(e){}
      subs.forEach(function(f){f(l);});
    }
    if(btn)btn.addEventListener("click",function(){apply(lang==="en"?"es":"en");});
    /* External links open in a new tab. */
    document.querySelectorAll('a[href^="http"]').forEach(function(a){
      if(a.host!==location.host){a.target="_blank";a.rel="noopener noreferrer";}
    });
    var saved="en";try{saved=localStorage.getItem(KEY)||"en";}catch(e){}
    scan();
    var api={t:t,apply:apply,refresh:function(){apply(lang);},lang:function(){return lang;},onChange:function(f){subs.push(f);}};
    if(saved==="es")setTimeout(function(){apply("es");},0);
    return api;
  };
})();
