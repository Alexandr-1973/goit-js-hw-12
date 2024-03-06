import{i as f,a as d}from"./assets/vendor-8cce9181.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=t(e);fetch(e.href,i)}})();const u=document.querySelector(".shopping-list-title");function l(){return JSON.parse(localStorage.getItem("addBook"))}function g(s){h();const o=l().map(t=>`<li class="shoppinglist-book" id="${t._id}">
          <img
            class="shoppinglist-book-image"
            src="${t.book_image}"
            alt="book image"
          />
          <div class="shoppinglist-total-div">
            <div class="shoppinglist-tb-div">
              <div class="shoppinglist-titcat-div">
                <h3 class="shoppinglist-book-title">${t.title}</h3>
                <p class="shoppinglist-book-category">${t.list_name}</p>
              </div>

              <button
                type="button"
                class="shoppinglist-book-deletebutton"
              ></button>
            </div>

            <div class="shoppinglist-desauthorlink">
              <p class="shoppinglist-book-description">${t.description}</p>

              <div class="shoppinglist-low-div">
                <p class="shoppinglist-book-author">${t.author}</p>
                <ul class="shoppinglist-book-low-ul">
                  <li class="shoppinglist-book-low-li-amazon">
                    <a
                      class="shopping-amazon-link"
                      href="${t.amazon_product_url}"
                      target="_blank"
                    >
                      <img
                        class="shopping-listamazon-img"
                        src="./img/amazon.png"
                        alt="logoAmazon"
                      />
                    </a>
                  </li>
                  <li class="shoppinglist-book-low-li-apple">
                    <a
                      class="shopping-apple-link"
                      href="${t.buy_links[1].url}"
                      target="_blank"
                    >
                      <img
                        class="shopping-apple-img"
                        src="./img/apple.png"
                        alt="logo Apple books"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>`).join("");u.insertAdjacentHTML("afterend",'<ul class="books"></ul>'),document.querySelector(".books").innerHTML=o}function m(){document.querySelector(".books")&&document.querySelector(".books").remove();const s=`<p class="shopping-list-text">
            This page is empty, add some books and proceed to order.
          </p>
              <img
                class="shopping-list-img"
                src="./img/books.png"
                alt="a lot of books"
              />`;u.insertAdjacentHTML("afterend",s),f.info({message:"The list of books is empty.",timeout:3e3,position:"topRight"})}function h(){document.querySelector(".shopping-list-img")&&(document.querySelector(".shopping-list-img").remove(),document.querySelector(".shopping-list-text").remove())}document.querySelector(".shopping-list").addEventListener("click",s=>{if(s.preventDefault(),s.target.nodeName=="BUTTON"){const o=s.target.closest("li").getAttribute("id");console.log(o);const t=l().filter(e=>e._id!==o);S(t),document.querySelector(`li[id="${o}"]`).remove()}l().length===0&&m()});l()&&l().length>0?g(l()):m();let a=[],c=[];async function b(){c=(await d.get("https://books-backend.p.goit.global/books/top-books")).data;for(let o=0;o<=5;o+=1)for(let t=0;t<=4;t+=1)a.push(c[o].books[t]._id)}b();let p=[];async function k(){for(let s=0;s<a.length;s+=4){const o=await d.get(`https://books-backend.p.goit.global/books/${a[s]}`);p.push(o.data)}localStorage.setItem("addBook",JSON.stringify(p)),g(l())}document.querySelector(".techbutton").addEventListener("click",y);function y(){k()}document.querySelector(".techbuttondel").addEventListener("click",v);function v(){localStorage.removeItem("addBook")}JSON.parse(localStorage.getItem("addBook"));function S(s){localStorage.setItem("addBook",JSON.stringify(s))}
//# sourceMappingURL=commonHelpers.js.map
