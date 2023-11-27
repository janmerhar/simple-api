import{d as k,g as C,r as y,o as N,a as P,b as g,c as x,e as s,f as m,t as v,h,i as B,_ as I,B as j,u as $,j as G,n as S,k as _,l as V}from"./index-e819e455.js";const R={class:"row"},q={class:"col-12 col-sm-4 order-2 order-sm-1 flexbox flexbox-direction-column flexbox-justify-content-space-between"},O={class:"row mt-3"},E={class:"col text-center fw-bolder text-uppercase title-spacing",id:"flag name"},T=["src","alt"],A={class:"row my-2"},D={class:"col-12 col-md-6 pt-2 fw-bolder"},H={class:"col-12 col-md-6 pt-2 fw-bolder"},M={class:"pt-2"},X=["href"],z={class:"row mt-3"},F={class:"col-12 col-sm-6 pt-2 d-grid mx-auto"},J={class:"col-12 col-sm-6 pt-2 d-grid me-auto"},K={class:"col-12 col-sm-8 order-1 order-sm-2"},L=["src","alt"],Q=k({__name:"GalleryCard",props:{breed:{type:Object,required:!0},nextBreed:{type:Object,required:!1},previousBreed:{type:Object,required:!1}},emits:["next","previous"],setup(e,{emit:f}){var d;const t=e,o=f,a=(d=C())==null?void 0:d.appContext.config.globalProperties.$http,n=y("https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp");N(async()=>{const l=await t.breed.fetchImage(a);l?n.value=l:n.value="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"});const c=()=>{o("next")},u=()=>{o("previous")};return(l,w)=>{var b,r;const i=P("font-awesome-icon");return g(),x("div",R,[s("div",q,[s("div",O,[s("h3",null,[s("div",E,[s("img",{src:`https://flagsapi.com/${e.breed.country_code}/flat/64.png`,alt:e.breed.country_code,class:"me-2"},null,8,T),m(" "+v(e.breed.name),1)])]),s("h6",null,[s("div",A,[s("div",D,[h(i,{icon:["fas","hourglass-half"]}),m(" "+v(e.breed.life_span)+" years ",1)]),s("div",H,[h(i,{icon:["fas","weight-hanging"]}),m(" "+v(e.breed.weight_metric)+" kg ",1)])])]),s("p",M,v(e.breed.description),1),e.breed.wikipedia_url?(g(),x("a",{key:0,class:"link-secondary",href:e.breed.wikipedia_url,target:"_blank"},[h(i,{icon:["fab","wikipedia-w"]}),m(" Read more ")],8,X)):B("",!0)]),s("div",z,[s("div",F,[e.previousBreed?(g(),x("button",{key:0,type:"button",class:"btn btn-primary p-3 button-icon",onClick:u},[h(i,{icon:["fas","angle-left"]}),m(" "+v((b=e.previousBreed)==null?void 0:b.name),1)])):B("",!0)]),s("div",J,[e.nextBreed?(g(),x("button",{key:0,type:"button",class:"btn btn-primary p-3 button-icon",onClick:c},[m(v((r=e.nextBreed)==null?void 0:r.name)+" ",1),h(i,{icon:["fas","angle-right"]})])):B("",!0)])])]),s("div",K,[s("img",{src:n.value,class:"card-img-top carousel responsive-image",alt:e.breed.name},null,8,L)])])}}});const U=I(Q,[["__scopeId","data-v-c1b08d2f"]]),W=(e,f=1)=>{const t=y(f),o=y(null),a=y(null),n=y(null),c=async r=>{try{const p=await j.fetchAll(e,r-1,1);return(p==null?void 0:p.length)>0?p[0]:null}catch{return null}},u=async()=>t.value>1?await c(t.value-1):null,d=async()=>t.value>0?await c(t.value):null,l=async()=>t.value>=0?await c(t.value+1):null;return{page:t,previousBreed:o,currentBreed:a,nextBreed:n,goPreviousBreed:async()=>{o.value&&(t.value-=1,n.value=a.value,a.value=o.value,o.value=await u())},goNextBreed:async()=>{n.value&&(t.value+=1,o.value=a.value,a.value=n.value,n.value=await l())},setupComposable:async()=>{o.value=await u(),a.value=await d(),n.value=await l()}}},Y={key:1,class:"text-center text-secondary"},te=k({__name:"GalleryView",setup(e){var r;const f=(r=C())==null?void 0:r.appContext.config.globalProperties.$http,t=$(),o=G(),{page:a,previousBreed:n,currentBreed:c,nextBreed:u,goPreviousBreed:d,goNextBreed:l,setupComposable:w}=W(f,o.params.page?parseInt(o.params.page):1);N(async()=>{await w(),t.push({params:{page:a.value.toString()}}),a.value++,await S(),a.value--});const i=async()=>{await d(),t.push({params:{page:a.value.toString()}})},b=async()=>{await l(),t.push({params:{page:a.value.toString()}})};return(p,Z)=>_(c)?(g(),V(U,{key:_(a),breed:_(c),"previous-breed":_(n),"next-breed":_(u),onPrevious:i,onNext:b},null,8,["breed","previous-breed","next-breed"])):(g(),x("h3",Y,"No breed found"))}});export{te as default};
