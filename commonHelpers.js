import{S as p,i as d}from"./assets/vendor-9310f15c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const l=document.querySelector(".loader");let f=new p(".gallery-item a",{captionDelay:250,captionsData:"alt"});const i=document.querySelector(".gallery"),m=document.querySelector(".search-form"),y="https://pixabay.com/api/",h="42139525-c14302dd397ed074e72a8f596";m.addEventListener("submit",s=>{s.preventDefault(),i.innerHTML="";const r=s.currentTarget.elements.query.value.trim();if(!r){c();return}l.style.display="block";const n=`${y}?key=${h}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`;g(n).then(o=>{l.style.display="none",o.hits.length===0?c():(i.innerHTML=x(o.hits),f.refresh())}).catch(o=>console.error(o))});function g(s){return fetch(s).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()})}function x(s){return s.map(({webformatURL:r,largeImageURL:n,tags:o,likes:e,views:t,comments:a,downloads:u})=>`<li class="gallery-item">
            <a href=${n}> 
                <img class="gallery-image" src=${r} alt=${o} />
            </a>
            <div class="gallery-text">
                <p class="text-block">Likes: <span class="text-value">${e}</span></p>
                <p class="text-block">Views: <span class="text-value">${t}</span></p>
                <p class="text-block">Comments: <span class="text-value">${a}</span></p>
                <p class="text-block">Downloads: <span class="text-value">${u}</span></p>
            </div>
      </li>`).join("")}function c(){d.error({maxWidth:432,position:"topRight",color:"red",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
