import { fetchImages } from './pixabay.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const searchField = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.style.display = 'none';
let page = 1;

function createImageCard(image) {
  return `
    <div class="photo-card">
      <a href="${image.largeImageURL}" target="_blank">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${image.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${image.views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${image.downloads}
        </p>
      </div>
    </div>
  `;
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  page = 1;
  try {
    const images = await fetchImages(searchField.value, page);
    gallery.innerHTML = '';
    images.map(image => {
      const card = createImageCard(image);
      gallery.insertAdjacentHTML('beforeend', card);
    });
    
    new SimpleLightbox('.photo-card a', {
        overlay: true,
        captions: true,
        captionPosition: 'bottom',
        animationSpeed: 250,
        closeText: '×'
      });
      // if (images.length * page < totalHits) {
      //   loadMoreButton.style.display = 'block';
      // } else {
      //   loadMoreButton.style.display = 'none';
      //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      // }
      // if (images.length >= totalHits) {
      //   // Сховати кнопку і вивести повідомлення
      //   loadMoreButton.style.display = 'none';
      //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      // }
  } catch (error) {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
  }
}

async function handleLoadMoreClick() {
  page++;
  try {
    const images = await fetchImages(searchField.value, page);
    images.map(image => {
      const card = createImageCard(image);
      gallery.insertAdjacentHTML('beforeend', card);
    });
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
    SimpleLightbox.refresh();
    // if (images.length * page < totalHits) {
    //   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    // } else {
    //   loadMoreButton.style.display = 'none';
    //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    // }
    // if (images.length >= totalHits) {
    //   // Сховати кнопку і вивести повідомлення
    //   loadMoreButton.style.display = 'none';
    //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    // }
  } catch (error) {
    Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
  }
}


form.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', handleLoadMoreClick);


// ...
// ${totalHits}
// let page = 1;

// function createImageCard(image) {
//   return `
//     <div class="photo-card">
//       <a href="${image.largeImageURL}" target="_blank">
//         <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//       </a>
//       <div class="info">
//         <p class="info-item">
//           <b>Likes:</b> ${image.likes}
//         </p>
//         <p class="info-item">
//           <b>Views:</b> ${image.views}
//         </p>
//         <p class="info-item">
//           <b>Comments:</b> ${image.comments}
//         </p>
//         <p class="info-item">
//           <b>Downloads:</b> ${image.downloads}
//         </p>
//       </div>
//     </div>
//   `;
// }

// async function handleFormSubmit(event) {
//   event.preventDefault();
//   page = 1;
//   try {
//     const images = await fetchImages(searchField.value, page);
//     gallery.innerHTML = '';
//     images.map(image => {
//       const card = createImageCard(image);
//       gallery.innerHTML += card;
//     });
//     loadMoreButton.style.display = 'block';
//     new SimpleLightbox('.photo-card a', {
//         overlay: true,
//         captions: true,
//         captionPosition: 'bottom',
//         animationSpeed: 250,
//         closeText: '×'
//       });
   
//   } catch (error) {
//     Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results`);
//   }
// }

// async function handleLoadMoreClick() {
//   page++;
//   try {
//     const images = await fetchImages(searchField.value, page);
//     images.map(image => {
//       const card = createImageCard(image);
//       gallery.innerHTML += card;
//     });
//     const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: "smooth",
//     });
//     SimpleLightbox.refresh();
//   } catch (error) {
//     Notiflix.Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
//   }
// }


// form.addEventListener('submit', handleFormSubmit);
// loadMoreButton.addEventListener('click', handleLoadMoreClick);

