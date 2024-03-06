import{i as f,a as g}from"./assets/vendor-8cce9181.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();const d=document.querySelector(".shopping-list-title");function l(){return JSON.parse(localStorage.getItem("addBook"))}function u(s){h();const o=l().map(e=>`<li class="shoppinglist-book" id="${e._id}">
          <img
            class="shoppinglist-book-image"
            src="${e.book_image}"
            alt="book image"
            width="100"
            height="142"
          /><div class="shoppinglist-cart-content">
            <h3 class="shoppinglist-book-title">${e.title}</h3>
            <p class="shoppinglist-book-category">${e.list_name}</p>
            <p class="shoppinglist-book-description">${e.description}</p><div class="shoppinglist-low-div">
              <p class="shoppinglist-book-author">${e.author}</p>
              <ul class="shoppinglist-book-low-ul">
                <li class="shoppinglist-book-low-li-amazon">
                  <a
                    class="shopping-amazon-link"
                    href="${e.amazon_product_url}"
                    target="_blank"
                  >
                    <img
                      class="shopping-listamazon-img"
                      srcset="
                        ./img/shopping-list/amazon-tabl-desk-1x.png 1x,
                        ./img/shopping-list/amazon-tabl-desk-2x.png 2x
                      "
                      src="./img/shopping-list/amazon-mob-1x.png"
                      alt="logoAmazon"
                      width="32"
                      height="11"
                    />
                  </a>
                </li>
                <li class="shoppinglist-book-low-li-apple">
                  <a
                    class="shopping-apple-link"
                    href="${e.buy_links[1].url}"
                    target="_blank"
                  >
                    <img
                      class="shopping-apple-img"
                      srcset="
                        ./img/shopping-list/apple-books-tabl-desk-1x.png 1x,
                        ./img/shopping-list/apple-books-tabl-desk-2x.png 2x
                      "
                      src="./img/shopping-list/apple-books-mob-1x.png"
                      alt="logo Apple books"
                      width="16"
                      height="16"
                    />
                  </a>
                </li>
              </ul>
            </div>
            <button type="button" class="shoppinglist-book-deletebutton">
              <svg class="shoppinglist-btn-svg" width="18" height="18">
                <use href="./img/sprite.svg#icon-trash_bin"></use>
              </svg>
            </button>
          </div>
        </li>`).join("");d.insertAdjacentHTML("afterend",'<div class="shopinglist-cart"><ul class="shoppinglist-list"></ul></div>'),document.querySelector(".shoppinglist-list").innerHTML=o}function m(){document.querySelector(".shoppinglist-list")&&document.querySelector(".shoppinglist-list").remove(),h();const s=`<p class="shopping-list-text">
      This page is empty, add some books and proceed to order.
    </p>
    <img
      srcset="
        ./img/shopping-list/empy-books-tab-desk-1x.png 1x,
        ./img/shopping-list/empy-books-tab-desk-2x.png 2x
      "
      class="shopping-list-img"
      src="./img/shopping-list/empty-books-mob.png"
      alt="a lot of books"
    />`;d.insertAdjacentHTML("afterend",s),f.info({message:"The list of books is empty.",timeout:3e3,position:"topRight"})}function h(){document.querySelector(".shopping-list-img")&&(document.querySelector(".shopping-list-img").remove(),document.querySelector(".shopping-list-text").remove())}document.querySelector(".shopping-list").addEventListener("click",s=>{if(s.preventDefault(),s.target.nodeName=="BUTTON"){const o=s.target.closest("li").getAttribute("id");console.log(o);const e=l().filter(t=>t._id!==o);S(e),document.querySelector(`li[id="${o}"]`).remove()}l().length===0&&m()});l()&&l().length>0?u(l()):m();let p=[],a=[];async function b(){a=(await g.get("https://books-backend.p.goit.global/books/top-books")).data;for(let o=0;o<=5;o+=1)for(let e=0;e<=4;e+=1)p.push(a[o].books[e]._id)}b();let c=[];async function k(){for(let s=0;s<p.length;s+=4){const o=await g.get(`https://books-backend.p.goit.global/books/${p[s]}`);c.push(o.data)}localStorage.setItem("addBook",JSON.stringify(c)),u(l())}document.querySelector(".techbutton").addEventListener("click",y);function y(){k()}JSON.parse(localStorage.getItem("addBook"));function S(s){localStorage.setItem("addBook",JSON.stringify(s))}
//# sourceMappingURL=commonHelpers.js.map
