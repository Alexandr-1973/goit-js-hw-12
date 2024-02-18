// import axios from 'axios';
// import "/src/js/render-functions";



// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import fetchServer from './js/pixabay-api';


import svgError from '/img/bi_x-octagon.svg';


import renderFunctions from './js/render-functions';

const formSubmit = document.querySelector('.form');
formSubmit.addEventListener('submit', onSubmit);
const LoadButton = document.querySelector('.load-button');
LoadButton.addEventListener("click", onLoadButton);
let searchText;
let pageNumber;

// var lightbox = new SimpleLightbox('.gallery a', {
//   captionPosition: 'bottom',
//   captionsData: 'alt',
//   className: 'modal',
//   /* options */
// });
// lightbox.refresh();




async function onSubmit(event) {
  
  event.preventDefault();
  renderFunctions.removeMarkup();
  searchText = event.target.elements.searchInput.value.trim();
  event.target.reset();

  if (searchText) {
    renderFunctions.setLoader();

    pageNumber = 1;

    const data = await fetchServer(searchText, pageNumber);
    renderFunctions.renderMarkup(data.hits);

      // const markup = renderFunctions.madeElementsMarkup(data.hits);
      // renderFunctions.renderMarkup(markup);
      


//     const { BASE_URL, END_POINT, API_KEY, constParameters } =
//       internetServerInfo;
//     const url = `${BASE_URL}${END_POINT}?key=${API_KEY}&q=${searchText}${constParameters}`;

//     fetch(url)
//       .then(response => response.json())
//       .then(array => {
//         if (array.hits.length === 0) {
//           iziToast.error({
//             timeout: 3000,
//             message:
//               'Sorry, there are no images matching your search query. Please try again!',
//             maxWidth: '432px',
//             messageColor: '#fff',
//             messageSize: '16px',
//             messageLineHeight: '1.5',
//             backgroundColor: '#ef4040',
//             position: 'topRight',
//             titleColor: '#fff',
//             titleSize: '16px',
//             titleLineHeight: '1.5',
//             iconUrl: svgError,
//           });
//           return;
//         } else {
//           const markup = array.hits
//             .map(image => {
//               const {
//                 webformatURL,
//                 largeImageURL,
//                 tags,
//                 likes,
//                 views,
//                 comments,
//                 downloads,
//               } = image;
//               return `<li class="gallery-item">
// <a class="gallery-link" href=${largeImageURL}>
// <img class="gallery-image" src=${webformatURL} alt="${tags}" />
// </a><div class="options-div"><div class="item-div"><h4 class="item-div-name">Likes</h4>
//   <p class="item-div-text">${likes}</p></div><div class="item-div"><h4 class="item-div-name">Views</h4>
//   <p class="item-div-text">${views}</p></div><div class="item-div"><h4 class="item-div-name">Comments</h4>
//   <p class="item-div-text">${comments}</p></div><div class="item-div"><h4 class="item-div-name">Downloads</h4>
//   <p class="item-div-text">${downloads}</p></div></div>
// </li>`;
//             })
//             .join('');

//           renderFunctions.renderMarkup(markup);




    //       var lightbox = new SimpleLightbox('.gallery a', {
    //         captionPosition: 'bottom',
    //         captionsData: 'alt',
    //         className: 'modal',
    //         /* options */
    //       });
    // lightbox.refresh();
    

      //   }
      // })
      // .catch(() => {
      //   console.log('Mistake from server');
      // });

    // setTimeout(() => {
    //   renderFunctions.removeLoader();
    // }, 1000);
  }
}

async function onLoadButton(event) {
  // console.log(searchText);
  

  pageNumber += 1;

      const data = await fetchServer(searchText, pageNumber);
  const markup = renderFunctions.renderMarkup(data.hits);
  
  // renderFunctions.renderMarkup(markup);
  
  // var lightbox = new SimpleLightbox('.gallery a', {
  //   captionPosition: 'bottom',
  //   captionsData: 'alt',
  //   className: 'modal',
  //   /* options */
  // });
  // lightbox.refresh();

};
