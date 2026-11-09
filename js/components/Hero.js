import{ProductCard}from"./ProductCard.js";
import{PRODUCTS}from"../data/products.js";
export const Hero=s=>{const w=s.mode==="wholesale",a=`<a class="btn${w?" alt":""}" href="#catalog">Browse Products</a>`,b=`<a class="btn${w?"":" alt"}" href="#wholesale">Get a Bulk Quote</a>`;
return`<section class="wrap hero"><div><p class="eyebrow">Kimana · Loitokitok · Rombo · Entonet · Iloodokilani</p><h1 style="margin-top:12px">Fresh stock. <mark>Honest sizes.</mark> One tap to order.</h1><p class="lead">Quality cereals, trusted animal feeds and reliable supply for homes, schools, hotels and farms. Pick your bag size and send your order straight to WhatsApp.</p><div class="cta">${w?b+a:a+b}</div></div><div class="panel">${ProductCard(s,PRODUCTS[0])}</div></section>`};
