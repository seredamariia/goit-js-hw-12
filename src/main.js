import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

let gallery = new SimpleLightbox('.gallery-item a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const cardContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-btn');
const loader = document.querySelector('.loader');

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '42139525-c14302dd397ed074e72a8f596';

let page = 1;
let query = '';
let maxPage = 0;

searchForm.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  cardContainer.innerHTML = '';
  page = 1;
  loadMore.classList.add('is-hidden');

  query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    handleNoImages();
    return;
  }

  try {
    const { hits, total } = await getImages(query);
    loader.style.display = 'none';
    maxPage = Math.ceil(total / 15);

    if (hits.length === 0) {
      loadMore.classList.add('is-hidden');
      handleNoImages();
    } else {
      createMarkup(hits);
      loadMore.classList.remove('is-hidden');
      loadMore.addEventListener('click', onLoadMore);
    }
  } catch {
    error => console.error(error);
  } finally {
    searchForm.reset();
    if (page === maxPage) {
      loadMore.classList.add('is-hidden');
      iziToast.error({
        maxWidth: 432,
        position: 'topRight',
        color: 'red',
        message: "We're sorry, but you've reached the end of search results!",
      });
    }
  }
}

async function getImages(query, page) {
  loader.style.display = 'block';
  return axios
    .get('/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    })
    .then(({ data }) => data);
}

async function onLoadMore() {
  page += 1;
  try {
    loadMore.classList.add('is-hidden');
    const { hits } = await getImages(query, page);
    loader.style.display = 'none';
    createMarkup(hits);
    scrollImg();
    loadMore.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  } finally {
    if (page === maxPage) {
      loadMore.classList.add('is-hidden');
      iziToast.error({
        maxWidth: 432,
        position: 'topRight',
        color: 'red',
        message: "We're sorry, but you've reached the end of search results!",
      });
    }
  }
}

function createMarkup(hits) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a href=${largeImageURL}> 
                <img class="gallery-image" src=${webformatURL} alt=${tags} />
            </a>
            <div class="gallery-text">
                <p class="text-block">Likes: <span class="text-value">${likes}</span></p>
                <p class="text-block">Views: <span class="text-value">${views}</span></p>
                <p class="text-block">Comments: <span class="text-value">${comments}</span></p>
                <p class="text-block">Downloads: <span class="text-value">${downloads}</span></p>
            </div>
      </li>`
    )
    .join('');

  cardContainer.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

function scrollImg() {
  const rect = document.querySelector('.gallery-item').getBoundingClientRect();
  window.scrollBy({ top: rect.height * 2, left: 0, behavior: 'smooth' });
}

function handleNoImages() {
  iziToast.error({
    maxWidth: 432,
    position: 'topRight',
    color: 'red',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
  loader.style.display = 'none';
}
