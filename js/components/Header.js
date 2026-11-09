import{esc}from"../render.js";
import{BUSINESS}from"../config.js";
const NAV=[["home","Home"],["catalog","Catalog"],["wholesale","Wholesale"],["coverage","Coverage"]];
const navLinks=s=>NAV.map(([v,t])=>`<a href="#${v}"${s.view===v?' aria-current="page"':""}>${t}</a>`).join("");
export const ModeSwitch=s=>`<div class="switch" role="group" aria-label="Customer type">${["retail","wholesale"].map(m=>`<button data-act="mode" data-mode="${m}" class="${s.mode===m?"on":""}" aria-pressed="${s.mode===m}">${m==="retail"?"Retail":"Wholesale"}</button>`).join("")}</div>`;
export const Header=s=>`<header class="site"><div class="wrap bar"><a class="brand" href="#home"><span class="mark">P</span>${esc(BUSINESS.name)}</a><nav class="nav" aria-label="Main">${navLinks(s)}</nav><div class="desk">${ModeSwitch(s)}</div><button class="burger" data-act="nav" aria-label="Menu" aria-expanded="${s.nav}">${s.nav?"✕":"☰"}</button></div><div class="wrap sub">${ModeSwitch(s)}</div>${s.nav?`<nav class="drawer" aria-label="Menu">${navLinks(s)}</nav>`:""}</header>`;
export const headerEvents=[
["click",'[data-act="mode"]',(e,el,c)=>c.dispatch({type:"SET_MODE",mode:el.dataset.mode})],
["click",'[data-act="nav"]',(e,el,c)=>c.dispatch({type:"TOGGLE_NAV"})]];
