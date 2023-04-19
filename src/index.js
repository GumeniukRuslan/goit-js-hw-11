import ApiService from "./helpers/ApiService";
import { makeMarkup } from "./helpers/makeMarkup";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const imageList = document.querySelector('.js-imageList');
const searchStart = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name="searchQuery"]');
const apiService = new ApiService();
let gallery = new SimpleLightbox('.js-imageList a');

searchStart.addEventListener('submit', searchImages);

function searchImages(evt) {
  evt.preventDefault();
  if (!searchQuery.value.trim()) return Notiflix.Notify.failure('Please enter your search request.');
  apiService.searchQ = searchQuery.value.trim();
  apiService.page = 1;
  apiService.getImgs().then((res) => {
    if (!res.data.hits.length) return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  
    Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images.`);
    imageList.innerHTML = makeMarkup(res);
    gallery.refresh();
    const lastImgObserver = new IntersectionObserver(entries => {
      const lastImg = entries[0];
      if (!lastImg.isIntersecting) return;
      apiService.page += 1;
      apiService.getImgs().then((res) => {
        imageList.insertAdjacentHTML('beforeend', makeMarkup(res));
        gallery.refresh();
      });
      lastImgObserver.unobserve(lastImg.target);
      lastImgObserver.observe(document.querySelector('.item-list:last-child'));
    });
    lastImgObserver.observe(document.querySelector('.item-list:last-child'));
  })
};



