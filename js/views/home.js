import{Hero}from"../components/Hero.js";
import{ProductCard,productEvents}from"../components/ProductCard.js";
import{CATEGORIES,getProduct}from"../data/products.js";
import{HUBS}from"../data/hubs.js";
const STEPS=[["Choose your bag size","Pick a product and a pack, from 10kg to 90kg."],["Send it on WhatsApp","One tap opens a message with your order ready."],["Confirm and receive","We confirm price and delivery, then supply your hub."]];
export const home={title:"Home",
render:s=>`${Hero(s)}
<section class="sec"><div class="wrap"><div class="sechead"><div><h2>Shop by category</h2><p class="intro">Start with what you need.</p></div></div><div class="grid g4">${CATEGORIES.map(c=>`<button class="cat" data-act="jumpcat" data-cat="${c.id}"><div class="pimg"><div class="pimg-i"><span>${c.label[0]}</span></div></div><h3>${c.label}</h3><small>Shop now →</small></button>`).join("")}</div></div></section>
<section class="sec tint"><div class="wrap"><div class="sechead"><div><h2>Featured products</h2><p class="intro">Choose a bag size and order on WhatsApp.</p></div><a href="#catalog">View all →</a></div><div class="grid g3">${["dairy","beans","maizeflour"].map(id=>ProductCard(s,getProduct(id))).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="sechead"><h2>How ordering works</h2></div><div class="grid g3">${STEPS.map(([t,d],i)=>`<div class="step"><div class="num">${i+1}</div><h3>${t}</h3><p>${d}</p></div>`).join("")}</div></div></section>
<section class="sec tint"><div class="wrap"><div class="sechead"><div><h2>Where we deliver</h2><p class="intro">Retail and bulk supply across Kajiado South.</p></div><a href="#coverage">See coverage →</a></div><div class="chips">${HUBS.map(h=>`<a class="chipl" href="#coverage">${h.name}</a>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="band"><h2>Buying for a school, hotel or farm?</h2><a class="btn gold" href="#wholesale">Request a quote</a></div></div></section>`,
events:[...productEvents,["click",'[data-act="jumpcat"]',(e,el,c)=>{c.dispatch({type:"SET_CATEGORY",cat:el.dataset.cat,silent:true});c.navigate("catalog")}]]};
