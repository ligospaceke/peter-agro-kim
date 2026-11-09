export const esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// bind(root, [[eventType, selector, handler(e, el, ctx)]], ctx) -> unbind(). Delegated, so re-rendering never loses handlers.
export const bind=(root,events,ctx)=>{const offs=events.map(([type,sel,fn])=>{const h=e=>{const el=e.target.closest(sel);if(el&&root.contains(el))fn(e,el,ctx)};root.addEventListener(type,h);return()=>root.removeEventListener(type,h)});return()=>offs.forEach(o=>o())};
