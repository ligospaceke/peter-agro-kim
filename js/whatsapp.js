import{BUSINESS}from"./config.js";
import{getProduct}from"./data/products.js";
import{getHub}from"./data/hubs.js";
import{selection,totalKg}from"./selectors.js";
const link=t=>`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(t)}`;
export const orderLink=(s,p)=>{const x=selection(s,p);return link(`Hello ${BUSINESS.name},\nI’d like to ${s.mode==="wholesale"?"request a quote":"order"}:\n• Product: ${p.name}\n• Pack size: ${x.s}kg\n• Quantity: ${x.q} bag${x.q>1?"s":""}\nDelivery to: \nName: `)};
export const quoteLink=s=>{const w=s.ws,h=getHub(w.hub);return link(`BULK QUOTE REQUEST — ${BUSINESS.name}\nOrganisation: ${w.org} (${w.type})\nContact: ${w.contact}\n\nItems:\n`+w.lines.map((l,i)=>`${i+1}. ${getProduct(l.p).name} — ${l.s}kg × ${l.q} bag${l.q>1?"s":""} = ${l.s*l.q}kg`).join("\n")+`\n\nTotal: ~${totalKg(s)}kg\nDelivery hub: ${h?h.name:"To confirm"}\nFrequency: ${w.freq}\nNotes: ${w.notes}`)};
export const generalLink=s=>link(`Hello ${BUSINESS.name}, I’d like to ask about your products.`);
export const hubLink=h=>link(`Hello ${BUSINESS.name}, I’d like to order for ${h.name}.`);
