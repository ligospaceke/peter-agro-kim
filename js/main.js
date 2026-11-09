import{createStore}from"./store.js";
import{reducer,initialState,persist}from"./state.js";
import{createRouter}from"./router.js";
import{bind}from"./render.js";
import{BUSINESS}from"./config.js";
import{Header,headerEvents}from"./components/Header.js";
import{Footer}from"./components/Footer.js";
import{Fab}from"./components/Fab.js";
import{home}from"./views/home.js";
import{catalog}from"./views/catalog.js";
import{wholesale}from"./views/wholesale.js";
import{coverage}from"./views/coverage.js";
const views={home,catalog,wholesale,coverage};
const store=createStore(reducer,initialState);
const $=id=>document.getElementById(id);
const router=createRouter(views,onRoute);
const ctx={dispatch:store.dispatch,getState:store.getState,navigate:router.navigate};
let current=home,unbindView=()=>{};
function paint(isRoute){const s=store.getState(),y=window.scrollY;
$("header").innerHTML=Header(s);$("fab").innerHTML=Fab(s);$("view").innerHTML=current.render(s);
document.title=`${current.title} · ${BUSINESS.name}`;document.body.dataset.view=s.view;
if(isRoute){window.scrollTo(0,0);const h=$("view").querySelector("h1");if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}else window.scrollTo(0,y)}
function onRoute(name){unbindView();current=views[name];store.dispatch({type:"ROUTE",name,silent:true});paint(true);unbindView=bind($("view"),current.events,ctx)}
store.subscribe((s,a)=>{persist(s);if(!a.silent)paint(false)});
bind($("header"),headerEvents,ctx);
$("footer").innerHTML=Footer(store.getState());
router.start();
