import{esc}from"../render.js";
import{BUSINESS}from"../config.js";
const NAV=[["home","Home"],["catalog","Catalog"],["wholesale","Wholesale"],["coverage","Coverage"]];
const navLinks=s=>NAV.map(([v,t])=>`<a href="#${v}"${s.view===v?' aria-current="page"':""}>${t}</a>`).join("");
const SVG='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const SUN=SVG+'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON=SVG+'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
export const ModeSwitch=s=>`<div class="switch" role="group" aria-label="Customer type">${["retail","wholesale"].map(m=>`<button data-act="mode" data-mode="${m}" class="${s.mode===m?"on":""}" aria-pressed="${s.mode===m}">${m==="retail"?"Retail":"Wholesale"}</button>`).join("")}</div>`;
export const Header=s=>{const d=s.theme==="dark";
return`<header class="site"><div class="wrap bar"><a class="brand" href="#home"><span class="mark">P</span>${esc(BUSINESS.name)}</a><nav class="nav" aria-label="Main">${navLinks(s)}</nav><div class="actions"><div class="desk">${ModeSwitch(s)}</div><button class="icon-btn" data-act="theme" aria-label="Switch to ${d?"light":"dark"} mode" aria-pressed="${d}">${d?SUN:MOON}</button><button class="icon-btn burger" data-act="nav" aria-label="Menu" aria-expanded="${s.nav}">${s.nav?"✕":"☰"}</button></div></div><div class="wrap sub">${ModeSwitch(s)}</div>${s.nav?`<nav class="drawer" aria-label="Menu">${navLinks(s)}</nav>`:""}</header>`};
export const headerEvents=[
["click",'[data-act="mode"]',(e,el,c)=>c.dispatch({type:"SET_MODE",mode:el.dataset.mode})],
["click",'[data-act="theme"]',(e,el,c)=>c.dispatch({type:"TOGGLE_THEME"})],
["click",'[data-act="nav"]',(e,el,c)=>c.dispatch({type:"TOGGLE_NAV"})]];
