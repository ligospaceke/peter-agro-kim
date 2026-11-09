import{Hero}from"../components/Hero.js";
import{ProductCard,productEvents}from"../components/ProductCard.js";
import{CATEGORIES,getProduct}from"../data/products.js";
const WHY=[["⚖️","Honest sizes","10kg, 25kg, 50kg and 90kg bags, so you buy only what you need."],["🌾","Stock you can trust","Clean, well-packed cereals, flours and animal feeds."],["📦","Built for bulk","Quotes for schools, hotels and farms with regular supply."],["💬","Order in one tap","Your order lands on WhatsApp, ready to confirm."]];
export const home={title:"Home",
render:s=>`${Hero(s)}
<section class="sec"><div class="wrap"><div class="sechead"><h2>Featured products</h2><a href="#catalog">View all →</a></div><div class="grid g3">${["dairy","beans","maizeflour"].map(id=>ProductCard(s,getProduct(id))).join("")}</div></div></section>
<section class="sec tint"><div class="wrap"><h2 style="margin-bottom:18px">Why buy from Peter’s</h2><div class="grid g4">${WHY.map(([i,t,d])=>`<div class="card adv"><span class="ico" aria-hidden="true">${i}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><h2 style="margin-bottom:18px">Shop by category</h2><div class="grid g4">${CATEGORIES.map(c=>`<button class="cat" data-act="jumpcat" data-cat="${c.id}"><span class="e" aria-hidden="true">${c.emoji}</span><b>${c.label}</b><small>Shop now →</small></button>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><h2 style="margin-bottom:16px">Who we supply</h2><div class="chips"><span>Households</span><span>Schools</span><span>Hotels</span><span>Farms</span></div></div></section>
<section class="sec"><div class="wrap"><div class="band"><h2>Need bulk stock for your school, hotel or farm?</h2><div><a class="btn gold" href="#wholesale">Request a Quote</a></div></div></div></section>`,
events:[...productEvents,["click",'[data-act="jumpcat"]',(e,el,c)=>{c.dispatch({type:"SET_CATEGORY",cat:el.dataset.cat,silent:true});c.navigate("catalog")}]]};
