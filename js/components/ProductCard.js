import{esc,svg,ICON}from"../render.js";
import{selection,isSaved}from"../selectors.js";
import{orderLink}from"../whatsapp.js";
import{CATEGORY_LABEL}from"../data/products.js";
export const SizeToggle=(p,x)=>`<div class="sizes" role="radiogroup" aria-label="Pack size">${p.sizes.map(z=>`<button role="radio" aria-checked="${z===x.s}" class="${z===x.s?"on":""}" data-act="size" data-id="${p.id}" data-size="${z}">${z}kg</button>`).join("")}</div>`;
export const ProductCard=(s,p)=>{const x=selection(s,p),w=s.mode==="wholesale",sv=isSaved(s,p.id);
return`<article class="card"><div class="pimg"><div class="pimg-i" role="img" aria-label="${esc(p.name)}">${p.img?`<img src="${esc(p.img)}" alt="" loading="lazy">`:`<span>${esc(p.name[0])}</span>`}</div><button class="heart${sv?" on":""}" data-act="save" data-id="${p.id}" aria-pressed="${sv}" aria-label="${sv?"Remove":"Save"} ${esc(p.name)} ${sv?"from":"to"} saved items">${svg(ICON.heart,sv)}</button></div><div><span class="tag">${CATEGORY_LABEL[p.cat]}</span><h3>${esc(p.name)}</h3></div>${SizeToggle(p,x)}<div class="qty"><button data-act="qty" data-id="${p.id}" data-d="-1" aria-label="Fewer bags">−</button><b>${x.q}</b><button data-act="qty" data-id="${p.id}" data-d="1" aria-label="More bags">+</button><span>bag${x.q>1?"s":""}</span></div><div class="price">${w&&x.s>=50?"<small>Bulk rate available</small>":"Price on WhatsApp"}</div><button class="btn block" data-act="add" data-id="${p.id}">${w?"Add to bulk quote":"Add to order"}</button><a class="quick" target="_blank" rel="noopener" href="${esc(orderLink(s,p))}">Order only this on WhatsApp</a></article>`};
export const productEvents=[
["click",'[data-act="size"]',(e,el,c)=>c.dispatch({type:"SELECT_SIZE",id:el.dataset.id,size:+el.dataset.size})],
["click",'[data-act="qty"]',(e,el,c)=>c.dispatch({type:"SET_QTY",id:el.dataset.id,d:+el.dataset.d})],
["click",'[data-act="save"]',(e,el,c)=>c.dispatch({type:"SAVE_TOGGLE",id:el.dataset.id})],
["click",'[data-act="add"]',(e,el,c)=>c.dispatch({type:c.getState().mode==="wholesale"?"WS_ADD_PRODUCT":"BASKET_ADD",id:el.dataset.id})]];
