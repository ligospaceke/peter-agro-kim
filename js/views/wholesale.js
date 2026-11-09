import{WholesaleBuilder,wholesaleEvents}from"../components/WholesaleBuilder.js";
export const wholesale={title:"Bulk Quote",render:s=>`<div class="wrap page wholesale">${WholesaleBuilder(s)}</div>`,events:wholesaleEvents};
