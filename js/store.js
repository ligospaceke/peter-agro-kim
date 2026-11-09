export function createStore(reducer,initial){let state=initial;const subs=new Set();
return{getState:()=>state,dispatch(a){state=reducer(state,a);subs.forEach(f=>f(state,a))},subscribe(f){subs.add(f);return()=>subs.delete(f)}}}
