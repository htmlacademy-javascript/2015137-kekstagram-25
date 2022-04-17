import { clearPhotoPosts } from './draw-photo.js';
import { drawPhotoPosts } from './draw-photo.js';
import { shuffleArrayElements } from './util.js';
import { debounce } from './util.js';

const filterElement = document.querySelector('.img-filters');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');
const filterButtonDefault = document.querySelector('#filter-default');

const DRAW_PHOTO_DELAY = 500;
const UNIC_POST_NUMBER = 10;
const POST_NUMBER_TO_DELETE = 15;

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
  shuffleArrayElements(randomPostData);
  randomPostData.splice(UNIC_POST_NUMBER, POST_NUMBER_TO_DELETE);
  clearPhotoPosts();
  drawPhotoPosts(randomPostData);
};

const clearButtonFilterClass = () => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
};

const selectedFilterApply = (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.closest('.img-filters__button')) {
    clearButtonFilterClass();
    evt.target.classList.add('img-filters__button--active');

    switch (evt.target.id) {
      case (filterButtonRandom.id):
        showRandomPhotoPosts();
        break;
      case (filterButtonDiscussed.id):
        showMostDiscussedPhotoPosts();
        break;
      case (filterButtonDefault.id):
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
  filterElement.addEventListener('click', debounce(selectedFilterApply, DRAW_PHOTO_DELAY));
};

const getDefaultPhotoPostData = (someData) => {
  defaultPostsData = someData;
  setFilterButtonClickListener();
};

export {getDefaultPhotoPostData, selectedFilterApply, defaultPostsData};
