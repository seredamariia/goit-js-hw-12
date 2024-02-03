import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const loader = document.querySelector('.loader');

let gallery = new SimpleLightbox('.gallery-item a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const cardContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '42139525-c14302dd397ed074e72a8f596';

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  cardContainer.innerHTML = '';

  const query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    handleNoImages();
    return;
  }

  loader.style.display = 'block';

  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;
  fetchImages(url)
    .then(data => {
      loader.style.display = 'none';
      if (data.hits.length === 0) {
        handleNoImages();
      } else {
        cardContainer.innerHTML = generateGallery(data.hits);
        gallery.refresh();
      }
    })
    .catch(error => console.error(error));
});

function fetchImages(url) {
  return fetch(url).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function generateGallery(hits) {
  return hits
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
}

function handleNoImages() {
  iziToast.error({
    maxWidth: 432,
    position: 'topRight',
    color: 'red',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}
