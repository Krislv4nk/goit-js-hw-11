import { fetchImages } from './pixabay.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const searchField = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page = 1;
let lightbox;
let loadedImages = 0;

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
  const searchQuery = searchField.value.trim();
  page = 1;
  loadedImages = 0;
  if (!searchQuery || searchQuery.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  } 
  try {
    const {hits, totalHits} = await fetchImages(searchField.value, page);
    gallery.innerHTML = '';
    if (hits && hits.length > 0) {
     const markup = hits.map(image => {
        return createImageCard(image);
      }).join('');
      gallery.insertAdjacentHTML('beforeend', markup);
      loadedImages += hits.length;
      if (loadedImages >= totalHits) {
        loadMoreButton.style.display = 'none'; 
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } else {
        loadMoreButton.style.display = 'block';
        Notiflix.Notify.success(`Hooray! We found ${hits.length} images`);
      }
    } else if (hits.length === 0) {
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    lightbox = new SimpleLightbox('.photo-card a', {
      overlay: true,
      captions: true,
      captionPosition: 'bottom',
      animationSpeed: 250,
      closeText: '×'
    });
  } catch (error) {
    console.error(error);
  }
}

async function handleLoadMoreClick() {
  page++;
  try {
    const {hits, totalHits} = await fetchImages(searchField.value, page);
    if (hits && hits.length > 0) {
     const markup = hits.map(image => {
        return createImageCard(image);
        
      }).join('');
      gallery.insertAdjacentHTML('beforeend', markup);
      loadedImages += hits.length;
      if (loadedImages >= totalHits) {
        loadMoreButton.style.display = 'none';
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } else {
        Notiflix.Notify.success(`Hooray! We found ${hits.length} more images`);
      }
      if (lightbox) {
        lightbox.refresh();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener('submit', handleFormSubmit);
loadMoreButton.addEventListener('click', handleLoadMoreClick);
