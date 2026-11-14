import{PACK_SIZES,CATEGORY_LABEL}from"../data/products.js";
import{hasFilters}from"../selectors.js";
import{esc}from"../render.js";
export const Filters=s=>{const pills=[];
if(s.cat!=="all")pills.push(`<button class="apill" data-act="rmf" data-kind="cat" aria-label="Remove filter ${CATEGORY_LABEL[s.cat]}">${CATEGORY_LABEL[s.cat]} ✕</button>`);
if(s.search.trim())pills.push(`<button class="apill" data-act="rmf" data-kind="search" aria-label="Remove search ${esc(s.search)}">“${esc(s.search)}” ✕</button>`);
return`<div class="filters"><div class="fgroup" role="group" aria-label="Pack size"><span class="flabel">Pack size</span>${PACK_SIZES.map(z=>`<button class="fchip${s.sizes.includes(z)?" on":""}" aria-pressed="${s.sizes.includes(z)}" data-act="fsize" data-size="${z}">${z}kg</button>`).join("")}</div>${pills.join("")}${hasFilters(s)?'<button class="clear" data-act="clearf">Clear all</button>':""}</div>`};
export const filterEvents=[
["click",'[data-act="fsize"]',(e,el,c)=>c.dispatch({type:"TOGGLE_SIZE",size:+el.dataset.size})],
["click",'[data-act="rmf"]',(e,el,c)=>c.dispatch({type:"REMOVE_FILTER",kind:el.dataset.kind})],
["click",'[data-act="clearf"]',(e,el,c)=>c.dispatch({type:"CLEAR_FILTERS"})]];
