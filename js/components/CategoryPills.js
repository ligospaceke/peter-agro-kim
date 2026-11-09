import{CATEGORIES}from"../data/products.js";
export const CategoryPills=s=>`<div class="pills" role="radiogroup" aria-label="Category">${[{id:"all",label:"All"},...CATEGORIES].map(c=>`<button role="radio" aria-checked="${s.cat===c.id}" class="${s.cat===c.id?"on":""}" data-act="cat" data-cat="${c.id}">${c.label}</button>`).join("")}</div>`;
export const pillEvents=[["click",'[data-act="cat"]',(e,el,c)=>c.dispatch({type:"SET_CATEGORY",cat:el.dataset.cat})]];
