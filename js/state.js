import{getProduct}from"./data/products.js";
import{selection}from"./selectors.js";
const st=(()=>{try{return JSON.parse(localStorage.getItem("pac"))||{}}catch(e){return{}}})();
export const initialState={view:"home",mode:st.mode||"retail",theme:st.theme==="dark"?"dark":"light",nav:false,cat:"all",search:"",sizes:[],sel:{},hub:"kimana",err:"",
basket:(st.basket||[]).filter(l=>getProduct(l.p)),saved:(st.saved||[]).filter(getProduct),cust:{name:"",place:"",...(st.cust||{})},
sheet:null,searchOpen:false,hq:"",hidx:-1,toast:null,say:"",
ws:{org:"",contact:"",type:"School",hub:"",freq:"One-off",notes:"",lines:[{p:"maize",s:50,q:10}],...(st.ws||{})}};
export const persist=s=>{try{localStorage.setItem("pac",JSON.stringify({mode:s.mode,theme:s.theme,ws:s.ws,basket:s.basket,saved:s.saved,cust:s.cust}))}catch(e){}};
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
const patchLine=(ws,i,f)=>({...ws,lines:ws.lines.map((l,j)=>j===i?f(l):l)});
const fitSize=l=>{const p=getProduct(l.p);return p.sizes.includes(l.s)?l:{...l,s:p.sizes[p.sizes.length-1]}};
const addLine=(s,id)=>{const p=getProduct(id),x=selection(s,p),i=s.basket.findIndex(l=>l.p===p.id&&l.s===x.s);
const basket=i<0?[...s.basket,{p:p.id,s:x.s,q:x.q}]:s.basket.map((l,j)=>j===i?{...l,q:clamp(l.q+x.q,1,999)}:l);
return{...s,basket,toast:{msg:`${p.name}, ${x.s}kg × ${x.q}, added to your order`,go:"order"},say:`${p.name} added to your order`}};
export function reducer(s,a){switch(a.type){
case"ROUTE":return{...s,view:a.name,nav:false,searchOpen:false};
case"SET_MODE":return{...s,mode:a.mode,sel:{}};
case"TOGGLE_THEME":return{...s,theme:s.theme==="dark"?"light":"dark"};
case"TOGGLE_NAV":return{...s,nav:!s.nav};
case"SET_CATEGORY":return{...s,cat:a.cat};
case"SET_SEARCH":return{...s,search:a.q};
case"TOGGLE_SIZE":return{...s,sizes:s.sizes.includes(a.size)?s.sizes.filter(z=>z!==a.size):[...s.sizes,a.size]};
case"REMOVE_FILTER":return a.kind==="cat"?{...s,cat:"all"}:{...s,search:""};
case"CLEAR_FILTERS":return{...s,cat:"all",sizes:[],search:""};
case"RUN_SEARCH":return{...s,search:a.q,cat:"all",sizes:[],searchOpen:false,hq:"",hidx:-1};
case"SEARCH_OPEN":return{...s,searchOpen:a.open,hq:"",hidx:-1};
case"SET_HQ":return{...s,hq:a.q,hidx:-1};
case"SET_HIDX":return{...s,hidx:a.i};
case"SELECT_SIZE":{const p=getProduct(a.id);return{...s,sel:{...s.sel,[p.id]:{...selection(s,p),s:a.size}}}}
case"SET_QTY":{const p=getProduct(a.id),x=selection(s,p);return{...s,sel:{...s.sel,[p.id]:{...x,q:clamp(x.q+a.d,1,99)}}}}
case"BASKET_ADD":case"SAVE_TO_BASKET":return addLine(s,a.id);
case"BASKET_QTY":return{...s,basket:s.basket.map((l,j)=>j===a.i?{...l,q:clamp(l.q+a.d,1,999)}:l)};
case"BASKET_REMOVE":return{...s,basket:s.basket.filter((_,j)=>j!==a.i)};
case"BASKET_CLEAR":return{...s,basket:[],say:"Order cleared"};
case"CUST_FIELD":return{...s,cust:{...s.cust,[a.key]:a.value}};
case"SAVE_TOGGLE":{const p=getProduct(a.id),has=s.saved.includes(a.id);return{...s,saved:has?s.saved.filter(x=>x!==a.id):[...s.saved,a.id],say:`${p.name} ${has?"removed from":"saved to"} saved items`}}
case"SHEET":return{...s,sheet:a.tab,toast:null};
case"TOAST_CLEAR":return{...s,toast:null};
case"SAY":return{...s,say:a.msg};
case"WS_ADD_PRODUCT":{const p=getProduct(a.id),x=selection(s,p);if(s.ws.lines.length>=12)return s;return{...s,ws:{...s.ws,lines:[...s.ws.lines,{p:p.id,s:x.s,q:x.q}]},toast:{msg:`${p.name}, ${x.s}kg × ${x.q}, added to your bulk quote`,go:"quote"},say:`${p.name} added to your bulk quote`}}
case"WS_ADD":return s.ws.lines.length<12?{...s,ws:{...s.ws,lines:[...s.ws.lines,{p:"maize",s:50,q:10}]}}:s;
case"WS_REMOVE":return{...s,ws:{...s.ws,lines:s.ws.lines.filter((_,i)=>i!==a.i)}};
case"WS_QTY":return{...s,ws:patchLine(s.ws,a.i,l=>({...l,q:clamp(l.q+a.d,1,999)}))};
case"WS_LINE":return{...s,ws:patchLine(s.ws,a.i,l=>a.key==="p"?fitSize({...l,p:a.value}):{...l,s:+a.value})};
case"WS_FIELD":return{...s,ws:{...s.ws,[a.key]:a.value}};
case"SET_HUB":return{...s,hub:a.id};
case"PREFILL_HUB":return{...s,ws:{...s.ws,hub:a.id}};
case"SET_ERR":return{...s,err:a.msg};
default:return s}}
