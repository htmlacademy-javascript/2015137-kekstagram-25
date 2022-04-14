import { photoContainerElement } from './draw-photo.js';
import { defaultPostsData } from './filter.js';
import { uploadFileModal } from './upload-modal.js';
import { isEscapeKey } from './util.js';

const fullSizeContainer = document.querySelector('.big-picture');
const bigPhotoElement = fullSizeContainer.querySelector('div.big-picture__img img');
const authorCommentElement = fullSizeContainer.querySelector('div.big-picture__social p.social__caption');
const likesElement = fullSizeContainer.querySelector('span.likes-count');
const commentsCountElement = fullSizeContainer.querySelector('.comments-count');
const allCommentsElement = fullSizeContainer.querySelector('.social__comment-count');
const loadMoreCommentsElement = fullSizeContainer.querySelector('.comments-loader');
const closeFullPictureButton = fullSizeContainer.querySelector('.big-picture__cancel');
const socialCommentContainer = fullSizeContainer.querySelector('.social__comments');


const getPhotoUrl = (someUrl) => someUrl.split('/').slice(3).join('/');

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

const createPhotoComments = (commentsData) => {
  const newCommentsContainer = document.createDocumentFragment();
  commentsData.forEach((comment) => {
    newCommentsContainer.append(createNewComment(comment));
  });
  return newCommentsContainer;
};

const showFullPicture = (evt) => {
  const clickedPost = getPhotoUrl(evt.target.src);
  bigPhotoElement.src = defaultPostsData.find((post) => post.url === clickedPost).url;
  likesElement.textContent = defaultPostsData.find((post) => post.url === clickedPost).likes;
  commentsCountElement.textContent = defaultPostsData.find((post) => post.url === clickedPost).comments.length;
  authorCommentElement.textContent = defaultPostsData.find((post) => post.url === clickedPost).description;
  const clickedPostComments = defaultPostsData.find((post) => post.url === clickedPost).comments;
  socialCommentContainer.append(createPhotoComments(clickedPostComments));
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
    allCommentsElement.classList.add('hidden');
    loadMoreCommentsElement.classList.add('hidden');
    fullSizeContainer.classList.remove('hidden');
    removePhotoComments();
    disablePreviewPhotoClick();
    showFullPicture(evt);
  }
}

function closeFullPicture () {
  closeFullPictureButton.removeEventListener('click', closeFullPicture);
  document.removeEventListener('keydown', onFullPictureEscKeydown);
  uploadFileModal.classList.remove('modal-open');
  fullSizeContainer.classList.add('hidden');
  onPreviewPhotoClick();
}

export {onPreviewPhotoClick, disablePreviewPhotoClick};
