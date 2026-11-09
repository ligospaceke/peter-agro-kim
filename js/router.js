export function createRouter(routes,onRoute){
const resolve=()=>{const n=location.hash.slice(1);return routes[n]?n:"home"};
const run=()=>onRoute(resolve());
return{start(){addEventListener("hashchange",run);run()},navigate(n){if(location.hash==="#"+n)run();else location.hash=n}}}
