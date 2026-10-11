(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;const v=document.querySelector('.hero-media'),t=document.querySelector('.vid-toggle');
function setP(p){if(p){v.pause();t.textContent='Play';t.setAttribute('aria-pressed','true');t.setAttribute('aria-label','Play background video')}else{v.play().catch(()=>{});t.textContent='Pause';t.setAttribute('aria-pressed','false');t.setAttribute('aria-label','Pause background video')}}
if(rm){v.removeAttribute('autoplay');setP(true)}t.addEventListener('click',()=>setP(!v.paused));
if(rm||!window.gsap)return;gsap.registerPlugin(ScrollTrigger);
if(window.Lenis){const l=new Lenis({lerp:.1});l.on('scroll',ScrollTrigger.update);gsap.ticker.add(x=>l.raf(x*1000));gsap.ticker.lagSmoothing(0);document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();l.scrollTo(el);}}))}
gsap.from('h1 .line span',{yPercent:110,duration:1.1,ease:'power4.out',stagger:.12});
gsap.from('.hero-inner .r:not(h1 span)',{y:24,opacity:0,duration:.9,ease:'power3.out',stagger:.1,delay:.35});
gsap.to('.hero-media',{yPercent:12,scale:1.06,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
ScrollTrigger.batch('.rv',{start:'top 88%',once:true,onEnter:b=>gsap.fromTo(b,{y:36,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',stagger:.08,overwrite:true})});
gsap.set('.rv',{opacity:0});ScrollTrigger.refresh();
})();
