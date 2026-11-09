import{getProduct}from"./data/products.js";
import{selection}from"./selectors.js";
const saved=(()=>{try{return JSON.parse(localStorage.getItem("pac"))||{}}catch(e){return{}}})();
export const initialState={view:"home",mode:saved.mode||"retail",nav:false,cat:"all",search:"",sel:{},hub:"kimana",err:"",
ws:{org:"",contact:"",type:"School",hub:"",freq:"One-off",notes:"",lines:[{p:"maize",s:50,q:10}],...(saved.ws||{})}};
export const persist=s=>{try{localStorage.setItem("pac",JSON.stringify({mode:s.mode,ws:s.ws}))}catch(e){}};
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
const patchLine=(ws,i,f)=>({...ws,lines:ws.lines.map((l,j)=>j===i?f(l):l)});
const fitSize=l=>{const p=getProduct(l.p);return p.sizes.includes(l.s)?l:{...l,s:p.sizes[p.sizes.length-1]}};
export function reducer(s,a){switch(a.type){
case"ROUTE":return{...s,view:a.name,nav:false};
case"SET_MODE":return{...s,mode:a.mode,sel:{}};
case"TOGGLE_NAV":return{...s,nav:!s.nav};
case"SET_CATEGORY":return{...s,cat:a.cat};
case"SET_SEARCH":return{...s,search:a.q};
case"SELECT_SIZE":{const p=getProduct(a.id);return{...s,sel:{...s.sel,[p.id]:{...selection(s,p),s:a.size}}}}
case"SET_QTY":{const p=getProduct(a.id),x=selection(s,p);return{...s,sel:{...s.sel,[p.id]:{...x,q:clamp(x.q+a.d,1,99)}}}}
case"WS_ADD":return s.ws.lines.length<12?{...s,ws:{...s.ws,lines:[...s.ws.lines,{p:"maize",s:50,q:10}]}}:s;
case"WS_REMOVE":return{...s,ws:{...s.ws,lines:s.ws.lines.filter((_,i)=>i!==a.i)}};
case"WS_QTY":return{...s,ws:patchLine(s.ws,a.i,l=>({...l,q:clamp(l.q+a.d,1,999)}))};
case"WS_LINE":return{...s,ws:patchLine(s.ws,a.i,l=>a.key==="p"?fitSize({...l,p:a.value}):{...l,s:+a.value})};
case"WS_FIELD":return{...s,ws:{...s.ws,[a.key]:a.value}};
case"SET_HUB":return{...s,hub:a.id};
case"PREFILL_HUB":return{...s,ws:{...s.ws,hub:a.id}};
case"SET_ERR":return{...s,err:a.msg};
default:return s}}
