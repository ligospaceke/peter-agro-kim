import{esc}from"../render.js";
import{generalLink}from"../whatsapp.js";
export const Fab=s=>`<a class="fab" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" href="${esc(generalLink(s))}"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="#fff"/></svg></a>`;
