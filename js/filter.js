import { clearPhotoPosts } from './draw-photo.js';
import { drawPhotoPosts } from './draw-photo.js';
import { getShuffledArrayElements } from './util.js';
import { useDebounce } from './util.js';

const DRAW_PHOTO_DELAY = 500;
const UNIC_POST_NUMBER = 10;
const POST_NUMBER_TO_DELETE = 15;

const filterElement = document.querySelector('.img-filters');
const filterButtonRandomElement = document.querySelector('#filter-random');
const filterButtonDiscussedElement = document.querySelector('#filter-discussed');
const filterButtonDefaultElement = document.querySelector('#filter-default');

let defaultPostsData = [];

const compareCommentsLength = (firstPost, secondPost) => {
  if (firstPost.comments.length < secondPost.comments.length) {
    return 1;
  }
  if (firstPost.comments.length > secondPost.comments.length) {
    return -1;
  }
  return 0;
};

const showDefaultPhotoPosts = () => {
  clearPhotoPosts();
  drawPhotoPosts(defaultPostsData);
};

const showMostDiscussedPhotoPosts = () => {
  const mostDiscussedPostData = defaultPostsData.slice();
  mostDiscussedPostData.sort(compareCommentsLength);
  clearPhotoPosts();
  drawPhotoPosts(mostDiscussedPostData);
};

const showRandomPhotoPosts = () => {
  const randomPostData = defaultPostsData.slice();
  getShuffledArrayElements(randomPostData);
  randomPostData.splice(UNIC_POST_NUMBER, POST_NUMBER_TO_DELETE);
  clearPhotoPosts();
  drawPhotoPosts(randomPostData);
};

const clearButtonFilterClass = () => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
};

const applySelectedFilter = (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.closest('.img-filters__button')) {
    clearButtonFilterClass();
    evt.target.classList.add('img-filters__button--active');

    switch (evt.target.id) {
      case (filterButtonRandomElement.id):
        showRandomPhotoPosts();
        break;
      case (filterButtonDiscussedElement.id):
        showMostDiscussedPhotoPosts();
        break;
      case (filterButtonDefaultElement.id):
        showDefaultPhotoPosts();
        break;
      default:
        showDefaultPhotoPosts();
        break;
    }
  }
};

const setFilterButtonClickListener = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', useDebounce(applySelectedFilter, DRAW_PHOTO_DELAY));
};

const getDefaultPhotoPostData = (someData) => {
  defaultPostsData = someData;
  setFilterButtonClickListener();
};

export {getDefaultPhotoPostData, applySelectedFilter, defaultPostsData};
