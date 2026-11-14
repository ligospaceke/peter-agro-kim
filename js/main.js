import{createStore}from"./store.js";
import{reducer,initialState,persist}from"./state.js";
import{createRouter}from"./router.js";
import{bind,reveal}from"./render.js";
import{BUSINESS}from"./config.js";
import{Header,headerEvents}from"./components/Header.js";
import{Footer}from"./components/Footer.js";
import{Fab}from"./components/Fab.js";
import{Sheet,Toast,sheetEvents,toastEvents}from"./components/Sheet.js";
import{home}from"./views/home.js";
import{catalog}from"./views/catalog.js";
import{wholesale}from"./views/wholesale.js";
import{coverage}from"./views/coverage.js";
const views={home,catalog,wholesale,coverage};
const store=createStore(reducer,initialState);
const $=id=>document.getElementById(id);
const router=createRouter(views,onRoute);
const ctx={dispatch:store.dispatch,getState:store.getState,navigate:router.navigate};
const htmlEl=document.documentElement,t0=performance.now();
const FILTER_ACTIONS=["TOGGLE_SIZE","SET_CATEGORY","SET_SEARCH","CLEAR_FILTERS","REMOVE_FILTER","RUN_SEARCH"];
const KEYS=["act","id","i","d","size","cat","key","mode","tab","kind"];
let current=home,unbindView=()=>{},booted=false,bootGo=null,prevSheet=null,prevSearch=false,toastT,countT;
function announce(m){const l=$("live");l.textContent="";setTimeout(()=>{l.textContent=m},60)}
function focusKey(){const a=document.activeElement;if(!a||a===document.body)return null;
if(a.id)return{sel:"#"+a.id,caret:a.selectionStart};const d=a.dataset;if(!d||!d.act)return null;
return{sel:KEYS.filter(k=>d[k]!==undefined).map(k=>`[data-${k}="${d[k]}"]`).join(""),caret:a.selectionStart}}
function applyTheme(t){if(htmlEl.dataset.theme!==t){htmlEl.classList.add("tt");htmlEl.dataset.theme=t;setTimeout(()=>htmlEl.classList.remove("tt"),500)}
const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="dark"?"#1c1713":"#8a5a3b"}
function paint(isRoute){const s=store.getState(),y=window.scrollY,fk=isRoute?null:focusKey();applyTheme(s.theme);
$("header").innerHTML=Header(s);$("fab").innerHTML=Fab(s);$("view").innerHTML=current.render(s);$("sheet").innerHTML=Sheet(s);$("toast").innerHTML=Toast(s);
document.title=`${current.title} · ${BUSINESS.name}`;document.body.dataset.view=s.view;document.body.classList.toggle("lock",!!s.sheet);
const go=reveal($("view"),!isRoute);if(isRoute&&!booted)bootGo=go;else go();
const sh=[...$("sheet").children];
if(s.sheet){if(prevSheet)sh.forEach(e=>e.classList.add("open"));else requestAnimationFrame(()=>requestAnimationFrame(()=>sh.forEach(e=>e.classList.add("open"))))}
if(isRoute){window.scrollTo(0,0);const h=$("view").querySelector("h1");if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}
else{window.scrollTo(0,y);if(fk){const el=document.querySelector(fk.sel);if(el){el.focus({preventScroll:true});if(fk.caret!=null&&el.setSelectionRange)try{el.setSelectionRange(fk.caret,fk.caret)}catch(e){}}}}
if(s.sheet&&!prevSheet){const b=$("sheet").querySelector(".icon-btn");if(b)b.focus({preventScroll:true})}
if(!s.sheet&&prevSheet&&!isRoute){const b=[...document.querySelectorAll('[data-act="open"]')].find(x=>x.offsetParent);if(b)b.focus({preventScroll:true})}
if(s.searchOpen&&!prevSearch){const i=$("hq");if(i)i.focus()}
prevSheet=s.sheet;prevSearch=s.searchOpen;
if(s.say){announce(s.say);store.dispatch({type:"SAY",msg:"",silent:true})}}
function onRoute(name){unbindView();current=views[name];store.dispatch({type:"ROUTE",name,silent:true});paint(true);unbindView=bind($("view"),current.events,ctx)}
function hideLoader(){booted=true;const wait=Math.max(0,650-(performance.now()-t0));
setTimeout(()=>{if(bootGo){bootGo();bootGo=null}const l=$("loader");if(l){l.classList.add("done");setTimeout(()=>l.remove(),600)}},wait)}
store.subscribe((s,a)=>{persist(s);if(a.silent)return;paint(false);
if(s.view==="catalog"&&FILTER_ACTIONS.includes(a.type)){clearTimeout(countT);countT=setTimeout(()=>{const n=document.querySelectorAll("#product-grid .card").length;announce(`${n} product${n===1?"":"s"} shown`)},400)}
if(["BASKET_ADD","SAVE_TO_BASKET","WS_ADD_PRODUCT"].includes(a.type)&&s.toast){clearTimeout(toastT);toastT=setTimeout(()=>store.dispatch({type:"TOAST_CLEAR"}),3500)}});
bind($("header"),headerEvents,ctx);bind($("sheet"),sheetEvents,ctx);bind($("toast"),toastEvents,ctx);
$("skip").addEventListener("click",e=>{e.preventDefault();$("view").focus()});
document.addEventListener("keydown",e=>{const s=store.getState();
if(e.key==="Escape"){if(s.sheet)store.dispatch({type:"SHEET",tab:null});else if(s.searchOpen){store.dispatch({type:"SEARCH_OPEN",open:false});const b=document.querySelector('[data-act="search"]');if(b)b.focus()}}
if(e.key==="Tab"&&s.sheet){const f=[...$("sheet").querySelectorAll("button,a[href],input,select")].filter(x=>!x.disabled&&x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];
if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
$("footer").innerHTML=Footer(store.getState());
router.start();
Promise.race([document.fonts?document.fonts.ready:Promise.resolve(),new Promise(r=>setTimeout(r,1500))]).then(hideLoader);
