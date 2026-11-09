import{esc}from"../render.js";
import{HUBS}from"../data/hubs.js";
import{hubLink}from"../whatsapp.js";
export const CoverageMap=s=>`<svg class="map" viewBox="0 0 520 360" role="group" aria-label="Schematic map of delivery hubs, not to scale"><g style="stroke:var(--p)" stroke-width="3" stroke-dasharray="6 6">${HUBS.slice(1).map(h=>`<line x1="260" y1="180" x2="${h.x}" y2="${h.y}"/>`).join("")}</g>${HUBS.map(h=>`<g class="node${s.hub===h.id?" on":""}" data-act="hub" data-id="${h.id}" tabindex="0" role="button" aria-label="${h.name}, ${h.role}"><circle cx="${h.x}" cy="${h.y}" r="${h.id==="kimana"?24:14}"/><text x="${h.x}" y="${h.y+(h.id==="kimana"||h.y>200?42:-24)}" text-anchor="middle">${h.name}</text></g>`).join("")}</svg>`;
export const HubList=s=>`<div class="hubs">${HUBS.map(h=>`<article class="card hub${s.hub===h.id?" on":""}"><div class="top"><span>${h.name}</span><span class="tag">${h.role}</span></div><p>Retail and bulk orders. Delivery is confirmed on WhatsApp.</p><a class="btn block" target="_blank" rel="noopener" href="${esc(hubLink(h))}">Order for ${h.name}</a><button class="btn alt block" data-act="hubquote" data-id="${h.id}">Bulk quote for ${h.name}</button></article>`).join("")}</div>`;
export const coverageEvents=[
["click",'[data-act="hub"]',(e,el,c)=>c.dispatch({type:"SET_HUB",id:el.dataset.id})],
["keydown",'[data-act="hub"]',(e,el,c)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();c.dispatch({type:"SET_HUB",id:el.dataset.id})}}],
["click",'[data-act="hubquote"]',(e,el,c)=>{c.dispatch({type:"PREFILL_HUB",id:el.dataset.id,silent:true});c.navigate("wholesale")}]];
