(()=>{const nav=document.querySelector('.nav');const onS=()=>nav.classList.toggle('scrolled',scrollY>10);addEventListener('scroll',onS,{passive:true});onS();
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(rm||!window.gsap)return;gsap.registerPlugin(ScrollTrigger);
if(window.Lenis){const l=new Lenis({lerp:.1});l.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const el=id==='#top'?0:document.querySelector(id);if(el!==null){e.preventDefault();l.scrollTo(el,{offset:-70});}}))}
gsap.from('.hero .r',{y:28,opacity:0,duration:1.1,ease:'power3.out',stagger:.09});
gsap.fromTo('.hero-photo img',{scale:1.08},{scale:1,duration:1.8,ease:'power2.out'});
gsap.set('.rv',{opacity:0,y:28});
ScrollTrigger.batch('.rv',{start:'top 90%',once:true,onEnter:b=>gsap.to(b,{y:0,opacity:1,duration:1,ease:'power3.out',stagger:.07,overwrite:true})});
document.querySelectorAll('.venture img,.contact-photo img').forEach(i=>gsap.fromTo(i,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:i.closest('a,figure'),scrub:true}}));
})();
