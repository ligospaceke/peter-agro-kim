export const CATEGORIES=[{id:"cereals",label:"Cereals",emoji:"🌽"},{id:"feeds",label:"Animal Feeds",emoji:"🐄"},{id:"flours",label:"Flours",emoji:"🌾"},{id:"pulses",label:"Pulses",emoji:"🫘"}];
export const CATEGORY_LABEL=Object.fromEntries(CATEGORIES.map(c=>[c.id,c.label]));
export const PACK_SIZES=[10,25,50,90];
// Sample catalog: confirm products and pack sizes with the shop. `syn` = search synonyms (incl. Swahili). Add `img` for a real photo.
export const PRODUCTS=[
{id:"maize",name:"Maize, Grade 1",cat:"cereals",sizes:[10,25,50,90],syn:["corn","mahindi"]},
{id:"sorghum",name:"Sorghum",cat:"cereals",sizes:[10,25,50,90],syn:["mtama"]},
{id:"beans",name:"Beans",cat:"pulses",sizes:[10,25,50,90],syn:["maharagwe","bean"]},
{id:"greengrams",name:"Green Grams",cat:"pulses",sizes:[10,25,50,90],syn:["ndengu","greengram","pojo"]},
{id:"maizeflour",name:"Maize Flour",cat:"flours",sizes:[10,25,50],syn:["unga","posho","corn flour"]},
{id:"dairy",name:"Dairy Meal",cat:"feeds",sizes:[25,50],syn:["dairy","cow","cattle","ng'ombe"]},
{id:"layers",name:"Layers Mash",cat:"feeds",sizes:[25,50],syn:["layer","chicken","poultry","kuku","eggs"]},
{id:"broiler",name:"Broiler Starter",cat:"feeds",sizes:[25,50],syn:["chick","chicken","poultry","kuku"]}];
export const getProduct=id=>PRODUCTS.find(p=>p.id===id);
