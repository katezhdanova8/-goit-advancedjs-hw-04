import{a as w,S as b,i as p}from"./assets/vendor-e8d7d58c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const P="8362380-caaef8a54ecf306e81d153d22",S="https://pixabay.com/api/",m=15,y=async(t,r)=>{const o=new URLSearchParams({key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:r});return await w.get(`${S}?${o}`)},g=t=>t.map(({webformatURL:r,largeImageURL:o,tags:a,likes:e,views:s,comments:i,downloads:L})=>`
            <li>
                <a href="${o}">
                    <img class="gallery__image" src="${r}" alt="${a}" />
                </a>
                <div class="gallery__info">
                    <div class="gallery__likes gallery__info__item">
                        <p class="fas fa-heart">Likes</p>
                        <span>${e}</span>
                    </div>
                    <div class="gallery__views gallery__info__item">
                        <p class="fas fa-eye">Views</p>
                        <span>${s}</span>
                    </div>
                    <div class="gallery__comments gallery__info__item">
                        <p class="fas fa-comment">Comments</p>
                        <span>${i}</span>
                    </div>
                    <div class="gallery__downloads gallery__info__item">
                        <p class="fas fa-download">Downloads</p>
                        <span>${L}</span>
                    </div>
                </div>
            </li>
        `).join(""),h=document.querySelector(".form"),f=document.querySelector(".gallery"),u=document.querySelector(".loader"),l=document.querySelector(".load-more-btn");let n=1,c="";const d=t=>{p.error({title:"Error",message:t,position:"topRight"})},_=t=>{p.info({title:"Info",message:t,position:"topRight"})},v=new b(".gallery a",{captionsData:"alt",captionDelay:250});h.addEventListener("submit",E);l.addEventListener("click",$);async function E(t){if(t.preventDefault(),c=t.currentTarget.elements.user_query.value.trim(),c===""){d("Please enter something to search."),h.reset();return}f.innerHTML="",n=1,u.classList.remove("is-hidden"),l.classList.add("is-hidden");try{const{data:r}=await y(c,n),{hits:o,totalHits:a}=r;if(o.length===0){d("Sorry, there are no images matching your search query. Please try again!");return}f.innerHTML=g(o),v.refresh(),o.length<m||o.length>=a?_("We're sorry, but you've reached the end of search results."):l.classList.remove("is-hidden")}catch{d("Failed to load images.")}finally{u.classList.add("is-hidden"),h.reset()}}async function $(){n+=1,u.classList.remove("is-hidden"),l.classList.add("is-hidden");try{const{data:t}=await y(c,n),{hits:r,totalHits:o}=t;f.insertAdjacentHTML("beforeend",g(r)),v.refresh(),n*m>=o?_("We're sorry, but you've reached the end of search results."):l.classList.remove("is-hidden"),q()}catch{d("Failed to load images.")}finally{u.classList.add("is-hidden")}}function q(){const{height:t}=f.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
