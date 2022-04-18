import { getDefaultPhotoPostData } from './filter.js';

const photoContainerElement = document.querySelector('.pictures');
const photoPostTemplateNode = document.querySelector('#picture').content.querySelector('.picture');

const drawPhotoPosts = (photoCardsData) => {
  const usersPhotoList = document.createDocumentFragment();
  photoCardsData.forEach((photoCard) => {
    const somePhoto = photoPostTemplateNode.cloneNode(true);
    const photoUrl = somePhoto.querySelector('.picture__img');
    const photoComments = somePhoto.querySelector('.picture__comments');
    const photoLikes = somePhoto.querySelector('.picture__likes');
    photoUrl.src = photoCard.url;
    photoComments.textContent = photoCard.comments.length;
    photoLikes.textContent = photoCard.likes;
    usersPhotoList.append(somePhoto);
  });
  return photoContainerElement.append(usersPhotoList);
};

const getPhotoPostsData = (receivedData) => {
  getDefaultPhotoPostData(receivedData);
  drawPhotoPosts(receivedData);
};

const clearPhotoPosts = () => {
  photoContainerElement.querySelectorAll('.picture').forEach((photoPost) => photoPost.remove());
};

export {getPhotoPostsData, clearPhotoPosts, drawPhotoPosts, photoContainerElement};
