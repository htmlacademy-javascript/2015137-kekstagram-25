import { clearPhotoPosts } from './draw-photo.js';
import { drawPhotoPosts } from './draw-photo.js';
import { shuffleArrayElements } from './util.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.img-filters');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');
const filterButtonDefault = document.querySelector('#filter-default');
const DRAW_PHOTO_DELAY = 500;

let defaultPostsData = [];

const addButtonFilterClass = (someButton) => {
  someButton.classList.add('img-filters__button--active');
};

const compareCommentsLength = (firstPost, secondPost) => {
  if (firstPost.comments.length < secondPost.comments.length) {
    return 1;
  }
  if (firstPost.comments.length > secondPost.comments.length) {
    return -1;
  }
  return 0;
};

const showDefaultPhotoPosts = debounce (() => {
  clearPhotoPosts();
  drawPhotoPosts(defaultPostsData);
}, DRAW_PHOTO_DELAY);

const showMostDiscussedPhotoPosts = debounce (() => {
  const mostDiscussedPostData = defaultPostsData.slice();
  mostDiscussedPostData.sort(compareCommentsLength);
  clearPhotoPosts();
  drawPhotoPosts(mostDiscussedPostData);
}, DRAW_PHOTO_DELAY);

const showRandomPhotoPosts = debounce (() => {
  const randomPostData = defaultPostsData.slice();
  shuffleArrayElements(randomPostData);
  clearPhotoPosts();
  drawPhotoPosts(randomPostData);
}, DRAW_PHOTO_DELAY);

const clearButtonFilterClass = () => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
};

const filterSetup = (evt) => {
  clearButtonFilterClass();
  switch (evt.target.id) {
    case (filterButtonRandom.id):
      showRandomPhotoPosts();
      addButtonFilterClass(filterButtonRandom);
      break;
    case (filterButtonDiscussed.id):
      showMostDiscussedPhotoPosts();
      addButtonFilterClass(filterButtonDiscussed);
      break;
    case (filterButtonDefault.id):
      showDefaultPhotoPosts();
      addButtonFilterClass(filterButtonDefault);
      break;
    default:
      showDefaultPhotoPosts();
      addButtonFilterClass(filterButtonDefault);
      break;
  }
};

const showFilter = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', filterSetup);
};

const getDefaultPhotoPostData = (someData) => {
  defaultPostsData = someData;
  showFilter();
};

export {getDefaultPhotoPostData};
