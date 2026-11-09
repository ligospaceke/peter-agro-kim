import{esc}from"../render.js";
import{selection}from"../selectors.js";
import{orderLink}from"../whatsapp.js";
import{CATEGORY_LABEL}from"../data/products.js";
export const SizeToggle=(p,x)=>`<div class="sizes" role="radiogroup" aria-label="Pack size">${p.sizes.map(z=>`<button role="radio" aria-checked="${z===x.s}" class="${z===x.s?"on":""}" data-act="size" data-id="${p.id}" data-size="${z}">${z}kg</button>`).join("")}</div>`;
export const ProductCard=(s,p)=>{const x=selection(s,p),w=s.mode==="wholesale";
return`<article class="card"><div class="pimg" role="img" aria-label="${esc(p.name)}">${p.emoji}</div><div><span class="tag">${CATEGORY_LABEL[p.cat]}</span><h3>${esc(p.name)}</h3></div>${SizeToggle(p,x)}<div class="qty"><button data-act="qty" data-id="${p.id}" data-d="-1" aria-label="Fewer bags">−</button><b>${x.q}</b><button data-act="qty" data-id="${p.id}" data-d="1" aria-label="More bags">+</button><span>bag${x.q>1?"s":""}</span></div><div class="price">${w&&x.s>=50?"<small>Bulk rate available</small>":"Price on WhatsApp"}</div><a class="btn block" target="_blank" rel="noopener" href="${esc(orderLink(s,p))}">${w?"Request quote on WhatsApp":"Order on WhatsApp"}</a></article>`};
export const productEvents=[
["click",'[data-act="size"]',(e,el,c)=>c.dispatch({type:"SELECT_SIZE",id:el.dataset.id,size:+el.dataset.size})],
["click",'[data-act="qty"]',(e,el,c)=>c.dispatch({type:"SET_QTY",id:el.dataset.id,d:+el.dataset.d})]];
