import { photoContainerElement } from './draw-photo.js';
import { defaultPostsData } from './filter.js';
import { uploadFileModal } from './upload-modal.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PORTION = 5;
const COMMENT_COUNT_PATTERN = /^[0-9]{1,9}/;
const URL_PATTERN = /photos\/+[0-9]{1,9}.jpg/g;

const fullSizeContainer = document.querySelector('.big-picture');
const bigPhotoElement = fullSizeContainer.querySelector('div.big-picture__img img');
const authorCommentElement = fullSizeContainer.querySelector('div.big-picture__social p.social__caption');
const likesElement = fullSizeContainer.querySelector('span.likes-count');
const allCommentsElement = fullSizeContainer.querySelector('.comments-count');
const shownCommentsElement = fullSizeContainer.querySelector('.social__comment-count').childNodes[0];
const loadMoreCommentsElement = fullSizeContainer.querySelector('.comments-loader');
const closeFullPictureButton = fullSizeContainer.querySelector('.big-picture__cancel');
const socialCommentContainer = fullSizeContainer.querySelector('.social__comments');

let currentPhotoPostComments = [];

const getPhotoUrl = (someUrl) => someUrl.match(URL_PATTERN).join();

const removePhotoComments = () => {
  while(socialCommentContainer.firstChild) {
    socialCommentContainer.firstChild.remove();
  }
};

const createNewComment = (commentData) => {
  const newLiElement = document.createElement('li');
  const newImgElement = document.createElement('img');
  const newPElement = document.createElement('p');
  newLiElement.classList.add('social__comment');
  newImgElement.classList.add('social__picture');
  newPElement.classList.add('social__text');
  newImgElement.src = commentData.avatar;
  newImgElement.alt = commentData.name;
  newPElement.textContent = commentData.message;
  newLiElement.append(newImgElement, newPElement);
  return newLiElement;
};

const increaseCommentsCount = (commentsAmount) => {
  shownCommentsElement.textContent = shownCommentsElement.textContent.replace(COMMENT_COUNT_PATTERN,
    (commentCount) => (+commentCount + commentsAmount));
};

const createPhotoComments = () => {
  const newCommentsContainer = document.createDocumentFragment();
  const photoPhostCommentsPart = currentPhotoPostComments.splice(0, COMMENTS_PORTION);
  let createdCommentsCount = 0;
  photoPhostCommentsPart.forEach((comment) => {
    newCommentsContainer.append(createNewComment(comment));
    createdCommentsCount++;
  });
  if (currentPhotoPostComments.length === 0) {
    loadMoreCommentsElement.classList.add('hidden');
  }
  increaseCommentsCount(createdCommentsCount);
  socialCommentContainer.append(newCommentsContainer);
};

const resetCommentCount = () => {
  shownCommentsElement.textContent = shownCommentsElement.textContent.replace(COMMENT_COUNT_PATTERN, 0);
};

const onMoreCommentsButtonClickListener = () => {
  loadMoreCommentsElement.addEventListener('click', createPhotoComments);
};

const showFullPicture = (evt) => {
  const clickedPost = getPhotoUrl(evt.target.src);
  bigPhotoElement.src = defaultPostsData.find((post) => post.url === clickedPost).url;
  likesElement.textContent = defaultPostsData.find((post) => post.url === clickedPost).likes;
  allCommentsElement.textContent = defaultPostsData.find((post) => post.url === clickedPost).comments.length;
  authorCommentElement.textContent = defaultPostsData.find((post) => post.url === clickedPost).description;
  currentPhotoPostComments = defaultPostsData.find((post) => post.url === clickedPost).comments.slice();
  createPhotoComments(currentPhotoPostComments);
  onMoreCommentsButtonClickListener();
  uploadFileModal.classList.add('modal-open');
};

const disablePreviewPhotoClick = () => {
  photoContainerElement.removeEventListener('click', openFullPicture);
};

const onPreviewPhotoClick = () => {
  photoContainerElement.addEventListener('click', openFullPicture);
};

const onFullPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullPicture();
  }
};

function openFullPicture (evt) {
  const clickedElement = evt.target;
  if (clickedElement.closest('img')) {
    closeFullPictureButton.addEventListener('click', closeFullPicture);
    document.addEventListener('keydown', onFullPictureEscKeydown);
    fullSizeContainer.classList.remove('hidden');
    loadMoreCommentsElement.classList.remove('hidden');
    resetCommentCount();
    removePhotoComments();
    disablePreviewPhotoClick();
    showFullPicture(evt);
  }
}

function closeFullPicture () {
  closeFullPictureButton.removeEventListener('click', closeFullPicture);
  document.removeEventListener('keydown', onFullPictureEscKeydown);
  loadMoreCommentsElement.removeEventListener('click', createPhotoComments);
  uploadFileModal.classList.remove('modal-open');
  fullSizeContainer.classList.add('hidden');
  resetCommentCount();
  onPreviewPhotoClick();
}

export {onPreviewPhotoClick, disablePreviewPhotoClick};
