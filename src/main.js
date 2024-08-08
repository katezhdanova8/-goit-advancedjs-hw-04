import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import { fetchPhotos, PER_PAGE } from './js/pixabay-api';
import { galleryMarkup } from './js/render-functions';

const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let searchValue = '';

const showError = (message) => {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
};

const showInfo = (message) => {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
  });
};

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();

  searchValue = event.currentTarget.elements.user_query.value.trim();

  if (searchValue === '') {
    showError('Please enter something to search.');
    searchForm.reset();
    return;
  }

  gallery.innerHTML = '';
  currentPage = 1;

  loader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const { data } = await fetchPhotos(searchValue, currentPage);
    const { hits, totalHits } = data;

    if (hits.length === 0) {
      showError('Sorry, there are no images matching your search query. Please try again!');
      return;
    }

    gallery.innerHTML = galleryMarkup(hits);
    lightbox.refresh();

    if (hits.length < PER_PAGE || hits.length >= totalHits) {
      showInfo('We\'re sorry, but you\'ve reached the end of search results.');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }
  } catch (error) {
    showError('Failed to load images.');
  } finally {
    loader.classList.add('is-hidden');
    searchForm.reset();
  }
}

async function onLoadMoreClick() {
  currentPage += 1;
  loader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');

  try {
    const { data } = await fetchPhotos(searchValue, currentPage);
    const { hits, totalHits } = data;

    gallery.insertAdjacentHTML('beforeend', galleryMarkup(hits));
    lightbox.refresh();

    if (currentPage * PER_PAGE >= totalHits) {
      showInfo('We\'re sorry, but you\'ve reached the end of search results.');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }

    scrollToNewImages();
  } catch (error) {
    showError('Failed to load images.');
  } finally {
    loader.classList.add('is-hidden');
  }
}

function scrollToNewImages() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
