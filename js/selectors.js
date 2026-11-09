import{PRODUCTS}from"./data/products.js";
export const selection=(s,p)=>s.sel[p.id]||{s:s.mode==="wholesale"?p.sizes[p.sizes.length-1]:p.sizes[0],q:1};
export const visibleProducts=s=>PRODUCTS.filter(p=>(s.cat==="all"||p.cat===s.cat)&&p.name.toLowerCase().includes(s.search.trim().toLowerCase()));
export const totalKg=s=>s.ws.lines.reduce((a,l)=>a+l.s*l.q,0);
