import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import amazontabdesk1x from './img/shopping-list/amazon-tabl-desk-1x.png';
import amazontabdesk2x from './img/shopping-list/amazon-tabl-desk-2x.png';
import amazonmob1x from './img/shopping-list/amazon-mob-1x.png';
import appletabdesk1x from './img/shopping-list/apple-books-tabl-desk-1x.png';
import appletabdesk2x from './img/shopping-list/apple-books-tabl-desk-2x.png';
import applemob1x from './img/shopping-list/apple-books-mob-1x.png';
import sprite from './img/sprite.svg';
// console.log(deletebuttonsvg);
import empytabdesk1x from './img/shopping-list/empy-books-tab-desk-1x.png';
import empytabdesk2x from './img/shopping-list/empy-books-tab-desk-2x.png';
import emptymob from './img/shopping-list/empty-books-mob.png';

const shopTitle = document.querySelector('.shopping-list-title');

function queryLocalStorage() {
  return JSON.parse(localStorage.getItem('addBook'));
}

function rendMarkup(elements) {
  removeEmptyMarkup();
  const markup = queryLocalStorage()
    .map(book => {
      return `<li class="shoppinglist-book" id="${book._id}">
          <img
            class="shoppinglist-book-image"
            src="${book.book_image}"
            alt="book image"
            width="100"
            height="142"
          /><div class="shoppinglist-cart-content">
            <h3 class="shoppinglist-book-title">${book.title}</h3>
            <p class="shoppinglist-book-category">${book.list_name}</p>
            <p class="shoppinglist-book-description">${book.description}</p><div class="shoppinglist-low-div">
              <p class="shoppinglist-book-author">${book.author}</p>
              <ul class="shoppinglist-book-low-ul">
                <li class="shoppinglist-book-low-li-amazon">
                  <a
                    class="shopping-amazon-link"
                    href="${book.amazon_product_url}"
                    target="_blank"
                  >
                    <img
                      class="shopping-listamazon-img"
                      srcset="${amazontabdesk1x} 1x, ${amazontabdesk2x} 2x"
                      src="${amazonmob1x}"
                      alt="logoAmazon"
                      width="32"
                      height="11"
                    />
                  </a>
                </li>
                <li class="shoppinglist-book-low-li-apple">
                  <a
                    class="shopping-apple-link"
                    href="${book.buy_links[1].url}"
                    target="_blank"
                  >
                    <img
                      class="shopping-apple-img"
                      srcset="${appletabdesk1x} 1x, ${appletabdesk2x} 2x"
                      src="${applemob1x}"
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
                <use href="${sprite}#icon-trash_bin"></use>
              </svg>
            </button>
          </div>
        </li>`;
    })
    .join('');

  shopTitle.insertAdjacentHTML(
    'afterend',
    `<div class="shopinglist-cart"><ul class="shoppinglist-list"></ul></div>`
  );
  document.querySelector('.shoppinglist-list').innerHTML = markup;
}

function addEmptyMarkup() {
  if (document.querySelector('.shoppinglist-list')) {
    document.querySelector('.shoppinglist-list').remove();
  }
  removeEmptyMarkup();

  const emptyMarkup = `<p class="shopping-list-text">
      This page is empty, add some books and proceed to order.
    </p>
    <img
      srcset="${empytabdesk1x} 1x, ${empytabdesk2x} 2x"
      class="shopping-list-img"
      src="${emptymob}"
      alt="a lot of books"
    />`;
  shopTitle.insertAdjacentHTML('afterend', emptyMarkup);
  iziToast.info({
    message: 'The list of books is empty.',
    timeout: 3000,
    position: 'topRight',
  });
}

function removeEmptyMarkup() {
  if (document.querySelector('.shopping-list-img')) {
    document.querySelector('.shopping-list-img').remove();
    document.querySelector('.shopping-list-text').remove();
  }
}

document.querySelector('.shopping-list').addEventListener('click', event => {
  if (event.target.nodeName == 'BUTTON') {
    const bookId = event.target.closest('li').getAttribute('id');
    console.log(bookId);
    const newArray = queryLocalStorage().filter(obj => obj._id !== bookId);
    addtoLS(newArray);
    const deleteElementLi = document.querySelector(`li[id="${bookId}"]`);
    deleteElementLi.remove();
  }
  if (queryLocalStorage().length === 0) {
    addEmptyMarkup();
  }
});

if (queryLocalStorage() && queryLocalStorage().length > 0) {
  rendMarkup(queryLocalStorage());
} else {
  addEmptyMarkup();
}

// технический код для отрисовки лишек

let idArray = [];
let firstArray = [];

async function getBooks() {
  const res = await axios.get(
    'https://books-backend.p.goit.global/books/top-books'
  );
  firstArray = res.data;

  for (let y = 0; y <= 5; y += 1) {
    for (let i = 0; i <= 4; i += 1) {
      idArray.push(firstArray[y].books[i]._id);
    }
  }
  // console.log(firstArray);
}

getBooks();

// for (let y = 0; y <= 5; y += 1) {
//   for (let i = 0; i <= 4; i += 1) {
//     idArray.push(firstArray[y].books[i]._id);
//   }
// }
// console.log(idArray);

let inLocalStorage = [];

let f;
async function setLS() {
  for (let i = 0; i < idArray.length; i += 4) {
    // console.log(idArray[i]);
    const result = await axios.get(
      `https://books-backend.p.goit.global/books/${idArray[i]}`
    );
    inLocalStorage.push(result.data);
  }
  localStorage.setItem('addBook', JSON.stringify(inLocalStorage));
  rendMarkup(queryLocalStorage());
}

// setLS();

document.querySelector('.techbutton').addEventListener('click', onTechbutton);
function onTechbutton() {
  setLS();
}

// document.querySelector(".techbuttondel").addEventListener("click", onRemoveButton);
// function onRemoveButton() {
//   localStorage.removeItem("addBook")
// }

// console.log(booksArray);

// '643282b1e85766588626a085';
// const t = '643282b1e85766588626a0ba';
// const result = await axios.get(
//   `https://books-backend.p.goit.global/books/${t}`
// );
// console.log(result.data);
// console.log(inStorage);
// console.log(JSON.stringify(inStorage));

// const LOCAL_STORAGE_KEY = 'addBook';
// localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inStorage[0]));

// 643282b1e85766588626a0ba

// const shopObject = {
//  const book_image:
//     'https://storage.googleapis.com/du-prd/books/images/9780385547345.jpg',
//   title: 'LESSONS IN CHEMISTRY',
//   list_name: 'Audio Fiction',
//   description:
//     'A scientist and single mother living in California in the 1960s becomes a star on a TV cooking show.',
//   author: 'Bonnie Garmus',
//   amazonUrl: 'https://www.amazon.com/dp/038554734X?tag=NYTBSREV-20',
//   appleBooksUrl: 'https://goto.applebooks.apple/9780593507537?at=10lIEQ',
//   id: '643282b1e85766588626a085',
// };
const fromLS = JSON.parse(localStorage.getItem('addBook'));
// console.log(fromLS);

// function queryLocalStorage() {
//   return JSON.parse(localStorage.getItem('addBook'));
// }

function addtoLS(newArray) {
  localStorage.setItem('addBook', JSON.stringify(newArray));
}




// ДОМАШКА12

// // Описаний у документації
// import iziToast from 'izitoast';
// // Додатковий імпорт стилів
// import 'izitoast/dist/css/iziToast.min.css';

// import fetchServer from './js/pixabay-api';

// import svgError from '/img/bi_x-octagon.svg';

// import renderFunctions from './js/render-functions';

// let searchText;
// let pageNumber;
// let maxPage;
// const perPage = 15;
// const formSubmit = document.querySelector('.form');
// formSubmit.addEventListener('submit', onSubmit);
// const LoadButton = document.querySelector('.load-button');
// LoadButton.addEventListener('click', onLoadButton);

// async function onSubmit(event) {
//   searchText = event.target.elements.searchInput.value.trim();
//   renderFunctions.hideLoadButton();
//   event.preventDefault();
//   renderFunctions.removeMarkup();
//   event.target.reset();

//   if (searchText) {
//     renderFunctions.setLoader();
//     pageNumber = 1;

//     try {
//       const data = await fetchServer(searchText, pageNumber, perPage);

//       if (data.hits.length === 0) {
//         renderFunctions.removeLoader();
//         iziToast.error({
//           timeout: 3000,
//           message:
//             'Sorry, there are no images matching your search query. Please try again!',
//           maxWidth: '432px',
//           messageColor: '#fff',
//           messageSize: '16px',
//           messageLineHeight: '1.5',
//           backgroundColor: '#ef4040',
//           position: 'topRight',
//           titleColor: '#fff',
//           titleSize: '16px',
//           titleLineHeight: '1.5',
//           iconUrl: svgError,
//         });
//         return;
//       } else {
//         maxPage = Math.ceil(data.totalHits / perPage);
//         renderFunctions.renderMarkup(data.hits);
//       }
//     } catch {
//       console.log('Mistake from server');
//     }

//     renderFunctions.removeLoader();
//     renderFunctions.loadButtonStatus(pageNumber, maxPage);
//   }
// }

// async function onLoadButton() {
//   renderFunctions.setLoader();
//   pageNumber += 1;

//   const data = await fetchServer(searchText, pageNumber, perPage);

//   renderFunctions.renderMarkup(data.hits);
//   renderFunctions.removeLoader();
//   renderFunctions.loadButtonStatus(pageNumber, maxPage);
//   if (pageNumber >= maxPage) {
//     iziToast.info({
//       timeout: 3000,
//       message: "We're sorry, but you've reached the end of search results.",
//       position: 'topRight',
//     });
//   }
//   window.scrollBy({
//     behavior: 'smooth',
//     top:
//       2 *
//       document.querySelector('.gallery-item').getBoundingClientRect().height,
//   });
// }
