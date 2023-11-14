import axios from "axios";
import Notiflix from 'notiflix';


export function fetchImages(searchQuery, page = 1) {
    const params = {
      key: '40664862-84b34fcb53558e764c2f17e18',
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page,
    };
  
    const url = 'https://pixabay.com/api/?' + new URLSearchParams(params).toString();
    return axios.get(url)
      .then(response => response.data.hits.map(image => ({
        webformatURL: image.webformatURL,
        largeImageURL: image.largeImageURL,
        tags: image.tags,
        likes: image.likes,
        views: image.views,
        comments: image.comments,
        downloads: image.downloads,
      })));
  }