import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
          />
          <div class="shoppinglist-total-div">
            <div class="shoppinglist-tb-div">
              <div class="shoppinglist-titcat-div">
                <h3 class="shoppinglist-book-title">${book.title}</h3>
                <p class="shoppinglist-book-category">${book.list_name}</p>
              </div>

              <button
                type="button"
                class="shoppinglist-book-deletebutton"
              ></button>
            </div>

            <div class="shoppinglist-desauthorlink">
              <p class="shoppinglist-book-description">${book.description}</p>

              <div class="shoppinglist-low-div">
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
                        src="./img/amazon.png"
                        alt="logoAmazon"
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
                        src="./img/apple.png"
                        alt="logo Apple books"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>`;
    })
    .join('');
  shopTitle.insertAdjacentHTML('afterend', `<ul class="books"></ul>`);
  document.querySelector('.books').innerHTML = markup;
}

function addEmptyMarkup() {
  if (document.querySelector('.books')) {
    document.querySelector('.books').remove();
  }

  const emptyMarkup = `<p class="shopping-list-text">
            This page is empty, add some books and proceed to order.
          </p>
              <img
                class="shopping-list-img"
                src="./img/books.png"
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
  event.preventDefault();
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

async function getBooks () {
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
};

getBooks()

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
