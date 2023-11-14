// import { fetchImages } from './pixabay.js';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

// const form = document.getElementById('search-form');
// const searchField = form.querySelector('input[name="searchQuery"]');
// const gallery = document.querySelector('.gallery');
// const loadMoreButton = document.querySelector('.load-more');

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
//     new SimpleLightbox('.photo-card a', { /* опції */ });
//   } catch (error) {
//     console.error('Error:', error);
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
//     SimpleLightbox.refresh();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


// form.addEventListener('submit', handleFormSubmit);
// loadMoreButton.addEventListener('click', handleLoadMoreClick);





import { fetchImages } from './pixabay.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.getElementById('search-form');
const searchField = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

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
    images.forEach(image => {
      const card = createImageCard(image);
      gallery.innerHTML += card;
    });
    loadMoreButton.style.display = 'block';
    new SimpleLightbox('.photo-card a', {
        overlay: true,
        captions: true,
        captionPosition: 'bottom',
        animationSpeed: 250,
        closeText: '×'
      });
      
      
  } catch (error) {
    console.error('Error:', error);
  }
}

async function handleLoadMoreClick() {
  page++;
  try {
    const images = await fetchImages(searchField.value, page);
    images.forEach(image => {
      const card = createImageCard(image);
      gallery.innerHTML += card;
    });
    SimpleLightbox.refresh();
  } catch (error) {
    console.error('Error:', error);
  }
}