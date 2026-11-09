import{esc}from"../render.js";
import{BUSINESS}from"../config.js";
import{HUBS}from"../data/hubs.js";
import{generalLink}from"../whatsapp.js";
export const Footer=s=>`<footer class="site"><div class="wrap"><p><b>${esc(BUSINESS.name)}</b></p><p>${esc(BUSINESS.tagline)}</p><p>Serving ${HUBS.map(h=>h.name).join(" · ")}, Kajiado South.</p><p><a target="_blank" rel="noopener" href="${esc(generalLink(s))}">Chat with us on WhatsApp</a></p></div></footer>`;
