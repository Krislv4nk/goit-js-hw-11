import axios from "axios";
import Notiflix from 'notiflix';

const form = document.getElementById('search-form');
const searchField = form.querySelector('input[name="searchQuery"]');


function handleFormSubmit(event) {
  
  event.preventDefault();
  const params = {
    key: '40664862-84b34fcb53558e764c2f17e18',
    q: searchField.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const url = 'https://pixabay.com/api/?' + new URLSearchParams(params).toString();
  axios.get(url)
    .then(response => {
      const data = response.data;
      if (data.hits.length === 0) {
       
        Notiflix.Notify.Failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        const images = data.hits.map(image => ({
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
            likes: image.likes,
            views: image.views,
            comments: image.comments,
            downloads: image.downloads,
        }));
      }
    })
    .catch(error => {
      // Обробка помилок запиту
      console.error('Error:', error);
    });
}

form.addEventListener('submit', handleFormSubmit);
export { handleFormSubmit };
