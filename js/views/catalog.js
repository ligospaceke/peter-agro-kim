import{ProductCard,productEvents}from"../components/ProductCard.js";
import{CategoryPills,pillEvents}from"../components/CategoryPills.js";
import{Filters,filterEvents}from"../components/Filters.js";
import{filteredProducts}from"../selectors.js";
import{esc}from"../render.js";
export const catalog={title:"Catalog",
render:s=>{const L=filteredProducts(s);
return`<div class="wrap page"><h1 style="font-size:clamp(2rem,6vw,2.75rem)">Our Products</h1><p class="intro">Add items to your order, then send everything in one WhatsApp message.</p><input class="search" data-act="csearch" type="search" placeholder="Search, e.g. maize, mahindi, dairy" value="${esc(s.search)}" aria-label="Search products" autocomplete="off">${CategoryPills(s)}${Filters(s)}<p class="count">${L.length} product${L.length===1?"":"s"}</p><div id="product-grid" class="grid g3">${L.map(p=>ProductCard(s,p)).join("")||'<p>No products match. <button class="clear" data-act="clearf">Clear filters</button> or ask us on WhatsApp.</p>'}</div></div>`},
events:[...productEvents,...pillEvents,...filterEvents,["input",'[data-act="csearch"]',(e,el,c)=>c.dispatch({type:"SET_SEARCH",q:el.value})]]};
