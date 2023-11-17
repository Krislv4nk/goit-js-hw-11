import axios from 'axios';
import Notiflix from 'notiflix';

export async function fetchImages(searchQuery, page = 1) {
  
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
  
  try {
    const { data } = await axios.get(url); 
    return data;
  } catch (error) {
    console.error(error);
  }
}
