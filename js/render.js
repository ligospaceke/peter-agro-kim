export const esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// bind(root, [[eventType, selector, handler(e, el, ctx)]], ctx) -> unbind(). Delegated, so re-rendering never loses handlers.
export const bind=(root,events,ctx)=>{const offs=events.map(([type,sel,fn])=>{const h=e=>{const el=e.target.closest(sel);if(el&&root.contains(el))fn(e,el,ctx)};root.addEventListener(type,h);return()=>root.removeEventListener(type,h)});return()=>offs.forEach(o=>o())};
const REVEAL="h1,h2,.eyebrow,.lead,.intro,.cta,.hs,.hv,.card,.cat,.band,.map,.step,.sechead";
// reveal(root, instant) tags elements for the scroll-in animation and returns go(); instant = no animation (state re-renders).
export const reveal=(root,instant)=>{const els=[...root.querySelectorAll(REVEAL)];
els.forEach((el,i)=>{el.classList.add("rv");el.style.setProperty("--d",(i<6?i*90:(i%4)*70)+"ms")});
return()=>{if(instant||!("IntersectionObserver"in window)||matchMedia("(prefers-reduced-motion: reduce)").matches){els.forEach(e=>e.classList.add("in"));return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1,rootMargin:"0px 0px -5% 0px"});els.forEach(e=>io.observe(e))}};
export const svg=(d,fill)=>`<svg viewBox="0 0 24 24" width="18" height="18" fill="${fill?"currentColor":"none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICON={search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',bag:'<path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>'};
