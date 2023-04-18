import { getUser } from "./helpers/makeFetch";
import Notiflix from 'notiflix';


const imageList = document.querySelector('.js-imageList');
const searchStart = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');

searchStart.addEventListener('submit', searchImages);

function searchImages(evt) {
  evt.preventDefault();
  getUser(searchQuery.value).then((res) => {
    if (!res.data.hits.length) {
      return Notiflix.Notify.failure('error')
    }
    makeMarkup(res)
  })
  
}

function makeMarkup(lObj) {
  console.log(lObj)
  const markup = lObj.data.hits.map(obj => `
    <li class="item-list">
      <img width="200" src="${obj.webformatURL}" alt="${obj.tags}">
      <div class="img-info">
        <div class="img__sub-info">
          <h2 class="sub-info__name">Likes</h2>
          <p class="sub-info__value">${obj.likes}</p>
        </div>
        <div class="img__sub-info">
          <h2 class="sub-info__name">Views</h2>
          <p class="sub-info__value">${obj.views}</p>
        </div>
        <div class="img__sub-info">
          <h2 class="sub-info__name">Comments</h2>
          <p class="sub-info__value">${obj.comments}</p>
        </div>
        <div class="img__sub-info">
          <h2 class="sub-info__name">Downloads</h2>
          <p class="sub-info__value">${obj.downloads}</p>
        </div>
      </div>
    </li>`)
    .join('')
  
  imageList.innerHTML = markup
}