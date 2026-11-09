import{ProductCard,productEvents}from"../components/ProductCard.js";
import{CategoryPills,pillEvents}from"../components/CategoryPills.js";
import{visibleProducts}from"../selectors.js";
import{esc,reveal}from"../render.js";
const productGrid=s=>visibleProducts(s).map(p=>ProductCard(s,p)).join("")||"<p>No products match. Ask us on WhatsApp.</p>";
export const catalog={title:"Catalog",
render:s=>`<div class="wrap page"><h1 style="font-size:clamp(2rem,6vw,2.75rem)">Our Products</h1><p class="intro">Choose a bag size and send your order to WhatsApp.</p><input class="search" data-act="search" type="search" placeholder="Search products" value="${esc(s.search)}" aria-label="Search products">${CategoryPills(s)}<div id="product-grid" class="grid g3" aria-live="polite">${productGrid(s)}</div></div>`,
events:[...productEvents,...pillEvents,["input",'[data-act="search"]',(e,el,c)=>{c.dispatch({type:"SET_SEARCH",q:el.value,silent:true});const g=document.getElementById("product-grid");g.innerHTML=productGrid(c.getState());reveal(g,true)()}]]};
