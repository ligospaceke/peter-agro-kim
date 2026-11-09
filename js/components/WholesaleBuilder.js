import{esc}from"../render.js";
import{PRODUCTS,getProduct}from"../data/products.js";
import{HUBS,getHub}from"../data/hubs.js";
import{totalKg}from"../selectors.js";
import{quoteLink}from"../whatsapp.js";
const opts=(items,cur)=>items.map(x=>`<option value="${esc(x.v)}"${String(x.v)===String(cur)?" selected":""}>${esc(x.t)}</option>`).join("");
const plain=a=>a.map(v=>({v,t:v}));
const lineRow=(l,i,n)=>{const p=getProduct(l.p);return`<div class="line"><label class="field full">Product<select data-act="line" data-key="p" data-i="${i}">${opts(PRODUCTS.map(x=>({v:x.id,t:x.name})),l.p)}</select></label><label class="field">Pack size<select data-act="line" data-key="s" data-i="${i}">${opts(p.sizes.map(z=>({v:z,t:z+"kg"})),l.s)}</select></label><div class="qty"><button data-act="wq" data-i="${i}" data-d="-1" aria-label="Fewer bags">−</button><b>${l.q}</b><button data-act="wq" data-i="${i}" data-d="1" aria-label="More bags">+</button><span>bags</span></div>${n>1?`<button class="link full" data-act="wdel" data-i="${i}">Remove</button>`:""}</div>`};
export const WholesaleBuilder=s=>{const w=s.ws,h=getHub(w.hub),n=w.lines.length;
return`<h1 style="font-size:clamp(2rem,6vw,2.75rem)">Bulk &amp; Institutional Supply</h1><p class="intro">For schools, hotels, farms and retailers. Build your list and we’ll confirm the quote on WhatsApp.</p><div class="two"><div class="form"><h2>1. Who are you?</h2><div class="cols"><label class="field">Organisation<input data-act="text" data-key="org" value="${esc(w.org)}" autocomplete="organization"></label><label class="field">Contact name<input data-act="text" data-key="contact" value="${esc(w.contact)}" autocomplete="name"></label></div><label class="field">Type<select data-act="field" data-key="type">${opts(plain(["School","Hotel","Farm","Retailer","Other"]),w.type)}</select></label><h2>2. What do you need?</h2>${w.lines.map((l,i)=>lineRow(l,i,n)).join("")}${n<12?'<button class="dash" data-act="wadd">+ Add another product</button>':""}<h2>3. Where and how often?</h2><div class="cols"><label class="field">Delivery hub<select data-act="field" data-key="hub"><option value="">Choose a hub</option>${opts(HUBS.map(x=>({v:x.id,t:x.name})),w.hub)}</select></label><label class="field">Frequency<select data-act="field" data-key="freq">${opts(plain(["One-off","Weekly","Monthly"]),w.freq)}</select></label></div><label class="field">Notes<textarea data-act="text" data-key="notes" rows="3">${esc(w.notes)}</textarea></label></div>
<aside class="sum" aria-live="polite"><div><b>~${totalKg(s)}kg total</b><small>${n} item${n>1?"s":""} · ${h?h.name:"hub to confirm"} · ${w.freq}</small></div><div class="more"><ul>${w.lines.map(l=>`<li>${esc(getProduct(l.p).name)}: ${l.s}kg × ${l.q} = ${l.s*l.q}kg</li>`).join("")}</ul><small>Indicative only. Final quote confirmed on WhatsApp.</small></div>${s.err?`<p class="err">${esc(s.err)}</p>`:""}<button class="btn gold" data-act="send">Send quote</button></aside></div>`};
export const wholesaleEvents=[
["input",'[data-act="text"]',(e,el,c)=>c.dispatch({type:"WS_FIELD",key:el.dataset.key,value:el.value,silent:true})],
["change",'[data-act="field"]',(e,el,c)=>c.dispatch({type:"WS_FIELD",key:el.dataset.key,value:el.value})],
["change",'[data-act="line"]',(e,el,c)=>c.dispatch({type:"WS_LINE",i:+el.dataset.i,key:el.dataset.key,value:el.value})],
["click",'[data-act="wq"]',(e,el,c)=>c.dispatch({type:"WS_QTY",i:+el.dataset.i,d:+el.dataset.d})],
["click",'[data-act="wdel"]',(e,el,c)=>c.dispatch({type:"WS_REMOVE",i:+el.dataset.i})],
["click",'[data-act="wadd"]',(e,el,c)=>c.dispatch({type:"WS_ADD"})],
["click",'[data-act="send"]',(e,el,c)=>{const s=c.getState();if(!s.ws.org.trim()){c.dispatch({type:"SET_ERR",msg:"Please add your organisation name."});return}
c.dispatch({type:"SET_ERR",msg:""});window.open(quoteLink(c.getState()),"_blank","noopener")}]];
