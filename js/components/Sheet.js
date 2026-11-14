import{esc}from"../render.js";
import{getProduct,CATEGORY_LABEL}from"../data/products.js";
import{basketKg,basketCount}from"../selectors.js";
import{basketLink,savedLink}from"../whatsapp.js";
const orderTab=s=>!s.basket.length?`<p>Your order is empty. Add products from the catalog and send them all in one message.</p><a class="btn" href="#catalog" data-act="sheetclose">Browse products</a>`:
`${s.basket.map((l,i)=>{const p=getProduct(l.p);return`<div class="bl"><div><b>${esc(p.name)}</b><br><small>${l.s}kg bag · ${l.s*l.q}kg</small></div><div class="qty"><button data-act="bq" data-i="${i}" data-d="-1" aria-label="Fewer ${esc(p.name)}">−</button><b>${l.q}</b><button data-act="bq" data-i="${i}" data-d="1" aria-label="More ${esc(p.name)}">+</button></div><button class="link" data-act="bdel" data-i="${i}" aria-label="Remove ${esc(p.name)}">Remove</button></div>`}).join("")}
<div class="cols"><label class="field">Your name<input data-act="cust" data-key="name" value="${esc(s.cust.name)}" autocomplete="name"></label><label class="field">Delivery location<input data-act="cust" data-key="place" value="${esc(s.cust.place)}" placeholder="e.g. Kimana" autocomplete="off"></label></div>
<p><b>~${basketKg(s)}kg</b> in total. We confirm prices and delivery on WhatsApp.</p><button class="btn block" data-act="bsend">Send order on WhatsApp</button><button class="clear" data-act="bclear">Clear order</button>`;
const savedTab=s=>!s.saved.length?`<p>Tap the heart on any product to save it here for later.</p><a class="btn" href="#catalog" data-act="sheetclose">Browse products</a>`:
`${s.saved.map(id=>{const p=getProduct(id);return`<div class="bl"><div><b>${esc(p.name)}</b><br><small>${CATEGORY_LABEL[p.cat]}</small></div><button class="btn alt" data-act="sadd" data-id="${p.id}">Add to order</button><button class="link" data-act="sdel" data-id="${p.id}" aria-label="Remove ${esc(p.name)} from saved">Remove</button></div>`}).join("")}<button class="btn block" data-act="ssend">Share list on WhatsApp</button>`;
export const Sheet=s=>{if(!s.sheet)return"";const t=s.sheet;
return`<div class="sheet-bg" data-act="sheetclose"></div><aside class="sheet" role="dialog" aria-modal="true" aria-label="Your order and saved items"><div class="sheet-h"><div class="tabs" role="tablist"><button role="tab" aria-selected="${t==="order"}" data-act="tab" data-tab="order">Order (${basketCount(s)})</button><button role="tab" aria-selected="${t==="saved"}" data-act="tab" data-tab="saved">Saved (${s.saved.length})</button></div><button class="icon-btn" data-act="sheetclose" aria-label="Close">✕</button></div><div class="sheet-b">${t==="order"?orderTab(s):savedTab(s)}</div></aside>`};
export const Toast=s=>s.toast?`<div class="toast" role="group" aria-label="Notification"><span>${esc(s.toast.msg)}</span><button data-act="toastgo" data-go="${s.toast.go}">${s.toast.go==="quote"?"View quote":"View order"}</button></div>`:"";
export const sheetEvents=[
["click",'[data-act="sheetclose"]',(e,el,c)=>c.dispatch({type:"SHEET",tab:null})],
["click",'[data-act="tab"]',(e,el,c)=>c.dispatch({type:"SHEET",tab:el.dataset.tab})],
["click",'[data-act="bq"]',(e,el,c)=>c.dispatch({type:"BASKET_QTY",i:+el.dataset.i,d:+el.dataset.d})],
["click",'[data-act="bdel"]',(e,el,c)=>c.dispatch({type:"BASKET_REMOVE",i:+el.dataset.i})],
["click",'[data-act="bclear"]',(e,el,c)=>c.dispatch({type:"BASKET_CLEAR"})],
["input",'[data-act="cust"]',(e,el,c)=>c.dispatch({type:"CUST_FIELD",key:el.dataset.key,value:el.value,silent:true})],
["click",'[data-act="bsend"]',(e,el,c)=>window.open(basketLink(c.getState()),"_blank","noopener")],
["click",'[data-act="sadd"]',(e,el,c)=>c.dispatch({type:"SAVE_TO_BASKET",id:el.dataset.id})],
["click",'[data-act="sdel"]',(e,el,c)=>c.dispatch({type:"SAVE_TOGGLE",id:el.dataset.id})],
["click",'[data-act="ssend"]',(e,el,c)=>window.open(savedLink(c.getState()),"_blank","noopener")]];
export const toastEvents=[["click",'[data-act="toastgo"]',(e,el,c)=>{c.dispatch({type:"TOAST_CLEAR"});if(el.dataset.go==="quote")c.navigate("wholesale");else c.dispatch({type:"SHEET",tab:"order"})}]];
