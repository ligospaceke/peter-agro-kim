import{esc,svg,ICON}from"../render.js";
import{BUSINESS}from"../config.js";
import{basketCount,searchProducts}from"../selectors.js";
import{CATEGORY_LABEL}from"../data/products.js";
const NAV=[["home","Home"],["catalog","Catalog"],["wholesale","Wholesale"],["coverage","Coverage"]];
const navLinks=s=>NAV.map(([v,t])=>`<a href="#${v}"${s.view===v?' aria-current="page"':""}>${t}</a>`).join("");
const badge=n=>n?`<span class="badge" aria-hidden="true">${n}</span>`:"";
export const ModeSwitch=s=>`<div class="switch" role="group" aria-label="Customer type">${["retail","wholesale"].map(m=>`<button data-act="mode" data-mode="${m}" class="${s.mode===m?"on":""}" aria-pressed="${s.mode===m}">${m==="retail"?"Retail":"Wholesale"}</button>`).join("")}</div>`;
const heartBtn=s=>`<button class="icon-btn" data-act="open" data-tab="saved" aria-label="Saved items, ${s.saved.length}">${svg(ICON.heart)}${badge(s.saved.length)}</button>`;
const themeBtn=s=>{const d=s.theme==="dark";return`<button class="icon-btn" data-act="theme" aria-label="Switch to ${d?"light":"dark"} mode" aria-pressed="${d}">${svg(d?ICON.sun:ICON.moon)}</button>`};
const SearchPanel=s=>{const r=searchProducts(s.hq),q=s.hq.trim(),n=r.length?r.length+1:0;
const opts=r.map((p,i)=>`<li role="option" id="opt-${i}" aria-selected="${s.hidx===i}" data-act="pick" data-q="${esc(p.name)}"><span>${esc(p.name)}</span><small>${CATEGORY_LABEL[p.cat]} · ${p.sizes.join("/")}kg</small></li>`).join("");
const all=r.length?`<li role="option" id="opt-${r.length}" aria-selected="${s.hidx===r.length}" data-act="pick" data-q="${esc(q)}"><span>See all results for “${esc(q)}”</span></li>`:"";
const list=q.length<2?"":`<ul id="sugg" class="sugg" role="listbox" aria-label="Suggestions">${opts+all||'<li class="none">No matches. Ask us on WhatsApp.</li>'}</ul>`;
return`<div class="wrap spanel" id="search-panel"><div class="sbox" role="combobox" aria-expanded="${n>0}" aria-haspopup="listbox" aria-owns="sugg"><input id="hq" data-act="hq" type="search" value="${esc(s.hq)}" placeholder="Search maize, mahindi, dairy meal…" autocomplete="off" aria-label="Search products" aria-autocomplete="list" aria-controls="sugg"${s.hidx>=0?` aria-activedescendant="opt-${s.hidx}"`:""}><button class="icon-btn" data-act="search" aria-label="Close search">✕</button></div>${list}</div>`};
export const Header=s=>`<header class="site"><div class="wrap bar"><a class="brand" href="#home"><span class="mark">P</span><span class="bn">${esc(BUSINESS.name)}</span></a><nav class="nav" aria-label="Main">${navLinks(s)}</nav><div class="actions"><div class="desk">${ModeSwitch(s)}</div><button class="icon-btn" data-act="search" aria-label="Search products" aria-expanded="${s.searchOpen}" aria-controls="search-panel">${svg(ICON.search)}</button><span class="desk-only">${heartBtn(s)}${themeBtn(s)}</span><button class="icon-btn" data-act="open" data-tab="order" aria-label="Your order, ${basketCount(s)} items">${svg(ICON.bag)}${badge(basketCount(s))}</button><button class="icon-btn burger" data-act="nav" aria-label="Menu" aria-expanded="${s.nav}">${s.nav?"✕":"☰"}</button></div></div>${s.searchOpen?SearchPanel(s):""}<div class="wrap sub">${ModeSwitch(s)}${heartBtn(s)}${themeBtn(s)}</div>${s.nav?`<nav class="drawer" aria-label="Menu">${navLinks(s)}</nav>`:""}</header>`;
const runSearch=(c,q)=>{if(q.trim()){c.dispatch({type:"RUN_SEARCH",q});c.navigate("catalog")}};
export const headerEvents=[
["click",'[data-act="mode"]',(e,el,c)=>c.dispatch({type:"SET_MODE",mode:el.dataset.mode})],
["click",'[data-act="theme"]',(e,el,c)=>c.dispatch({type:"TOGGLE_THEME"})],
["click",'[data-act="nav"]',(e,el,c)=>c.dispatch({type:"TOGGLE_NAV"})],
["click",'[data-act="search"]',(e,el,c)=>c.dispatch({type:"SEARCH_OPEN",open:!c.getState().searchOpen})],
["click",'[data-act="open"]',(e,el,c)=>c.dispatch({type:"SHEET",tab:el.dataset.tab})],
["input",'[data-act="hq"]',(e,el,c)=>c.dispatch({type:"SET_HQ",q:el.value})],
["click",'[data-act="pick"]',(e,el,c)=>runSearch(c,el.dataset.q)],
["keydown",'[data-act="hq"]',(e,el,c)=>{const s=c.getState(),r=searchProducts(s.hq),n=r.length?r.length+1:0;
if(e.key==="ArrowDown"){e.preventDefault();c.dispatch({type:"SET_HIDX",i:Math.min(s.hidx+1,n-1)})}
else if(e.key==="ArrowUp"){e.preventDefault();c.dispatch({type:"SET_HIDX",i:Math.max(s.hidx-1,-1)})}
else if(e.key==="Enter"){e.preventDefault();runSearch(c,s.hidx>=0&&s.hidx<r.length?r[s.hidx].name:s.hq)}}]];
