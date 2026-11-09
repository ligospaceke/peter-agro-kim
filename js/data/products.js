export const CATEGORIES=[{id:"cereals",label:"Cereals",emoji:"🌽"},{id:"feeds",label:"Animal Feeds",emoji:"🐄"},{id:"flours",label:"Flours",emoji:"🌾"},{id:"pulses",label:"Pulses",emoji:"🫘"}];
export const CATEGORY_LABEL=Object.fromEntries(CATEGORIES.map(c=>[c.id,c.label]));
// Sample catalog: confirm products and pack sizes with the shop.
export const PRODUCTS=[
{id:"maize",name:"Maize, Grade 1",cat:"cereals",sizes:[10,25,50,90],emoji:"🌽"},
{id:"sorghum",name:"Sorghum",cat:"cereals",sizes:[10,25,50,90],emoji:"🌾"},
{id:"beans",name:"Beans",cat:"pulses",sizes:[10,25,50,90],emoji:"🫘"},
{id:"greengrams",name:"Green Grams",cat:"pulses",sizes:[10,25,50,90],emoji:"🌱"},
{id:"maizeflour",name:"Maize Flour",cat:"flours",sizes:[10,25,50],emoji:"🥣"},
{id:"dairy",name:"Dairy Meal",cat:"feeds",sizes:[25,50],emoji:"🐄"},
{id:"layers",name:"Layers Mash",cat:"feeds",sizes:[25,50],emoji:"🐔"},
{id:"broiler",name:"Broiler Starter",cat:"feeds",sizes:[25,50],emoji:"🐥"}];
export const getProduct=id=>PRODUCTS.find(p=>p.id===id);
