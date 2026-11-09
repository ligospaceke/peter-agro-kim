export const esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// bind(root, [[eventType, selector, handler(e, el, ctx)]], ctx) -> unbind(). Delegated, so re-rendering never loses handlers.
export const bind=(root,events,ctx)=>{const offs=events.map(([type,sel,fn])=>{const h=e=>{const el=e.target.closest(sel);if(el&&root.contains(el))fn(e,el,ctx)};root.addEventListener(type,h);return()=>root.removeEventListener(type,h)});return()=>offs.forEach(o=>o())};
const REVEAL="h1,h2,.eyebrow,.lead,.intro,.cta,.hs,.hv,.card,.cat,.band,.map,.step,.sechead";
// reveal(root, instant) tags elements for the scroll-in animation and returns go(); instant = no animation (state re-renders).
export const reveal=(root,instant)=>{const els=[...root.querySelectorAll(REVEAL)];
els.forEach((el,i)=>{el.classList.add("rv");el.style.setProperty("--d",(i<6?i*90:(i%4)*70)+"ms")});
return()=>{if(instant||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){els.forEach(e=>e.classList.add("in"));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1,rootMargin:"0px 0px -5% 0px"});els.forEach(e=>io.observe(e))}};
