import ApiService from './helpers/ApiService';
import { makeMarkup } from './helpers/makeMarkup';
import scrollToStart from './helpers/scrollToStart';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imageList = document.querySelector('.js-imageList');
const searchStart = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const beginBtn = document.querySelector('.to-begin');
const guard = document.querySelector('.js-guard');
const apiService = new ApiService();
let gallery = new SimpleLightbox('.js-imageList a');
const options = {
  root: null,
  rootMargin: '500px',
  treshold: 0,
};
const observer = new IntersectionObserver(onPagination, options);

searchStart.addEventListener('submit', searchImages);

beginBtn.addEventListener('click', scrollToStart);

function searchImages(evt) {
  evt.preventDefault();

  if (!searchQuery.value.trim())
    return Notiflix.Notify.failure('Please enter your search request.');

  apiService.searchQ = searchQuery.value.trim();
  apiService.page = 1;

  apiService.getImgs().then(res => {
    if (!res.data.hits.length)
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

    scrollToStart();

    Notiflix.Notify.success(
      `Hooray! We found ${(res.data.totalHits = 500
        ? res.data.totalHits + 20
        : res.data.totalHits)} images.`
    );
    imageList.innerHTML = makeMarkup(res);
    gallery.refresh();
    beginBtn.style.display = 'block';
    observer.observe(guard);
  });
}

function onPagination(entries, observer) {
  if (entries[0].isIntersecting) {
    apiService.page += 1;
    apiService.getImgs().then(res => {
      imageList.insertAdjacentHTML('beforeend', makeMarkup(res));
      gallery.refresh();
      if (!(imageList.childNodes.length % (res.data.totalHits + 20))) {
        observer.unobserve(guard);
      }
    });
  }
}
