import { clearPhotoPosts } from './draw-photo.js';
import { drawPhotoPosts } from './draw-photo.js';
import { shuffleArrayElements } from './util.js';

const filterElement = document.querySelector('.img-filters');
const filterButtonRandom = document.querySelector('#filter-random');
const filterButtonDiscussed = document.querySelector('#filter-discussed');
const filterButtonDefault = document.querySelector('#filter-default');

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

const showDefaultPhotoPosts = () => {
  addButtonFilterClass(filterButtonDefault);
  drawPhotoPosts(defaultPostsData);
};

const showMostDiscussedPhotoPosts = () => {
  addButtonFilterClass(filterButtonDiscussed);
  const mostDiscussedPostData = defaultPostsData.slice();
  mostDiscussedPostData.sort(compareCommentsLength);
  drawPhotoPosts(mostDiscussedPostData);
};

const showRandomPhotoPosts = () => {
  addButtonFilterClass(filterButtonRandom);
  const randomPostData = defaultPostsData.slice();
  shuffleArrayElements(randomPostData);
  drawPhotoPosts(randomPostData);
};

const clearButtonFilterClass = () => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
};

const filterSetup = (evt) => {
  clearButtonFilterClass();
  clearPhotoPosts();
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
};

export {showFilter, getDefaultPhotoPostData};
