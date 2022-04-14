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
  clearPhotoPosts();
  drawPhotoPosts(randomPostData);
};

const clearButtonFilterClass = () => {
  filterElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
};

const selectedFilterApply = (evt) => {
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
};

const debounceFilterClicks = debounce(selectedFilterApply, DRAW_PHOTO_DELAY);

const onFilterButtonClick = () => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', (evt) => {
    const clickedElement = evt.target;
    if (clickedElement.closest('.img-filters__button')) {
      clearButtonFilterClass();
      evt.target.classList.add('img-filters__button--active');
      debounceFilterClicks(evt);
    }
  });
};

const getDefaultPhotoPostData = (someData) => {
  defaultPostsData = someData;
  onFilterButtonClick();
};

export {getDefaultPhotoPostData, onFilterButtonClick, selectedFilterApply};
