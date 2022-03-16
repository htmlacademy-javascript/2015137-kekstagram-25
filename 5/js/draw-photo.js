import { createPhotoCardsData, REQUIRED_PHOTOCARDS } from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoPostTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotoPosts = (photoCardsData) => {
  const usersPhotoList = document.createDocumentFragment();
  photoCardsData.forEach((photoCard) => {
    const somePhoto = photoPostTemplate.cloneNode(true);
    const photoUrl = somePhoto.querySelector('.picture__img');
    const photoCcomments = somePhoto.querySelector('.picture__comments');
    const photoLikes = somePhoto.querySelector('.picture__likes');
    photoUrl.src = photoCard.url;
    photoCcomments.textContent = photoCard.comments.length;
    photoLikes.textContent = photoCard.likes;
    usersPhotoList.append(somePhoto);
  });
  return usersPhotoList;
};

const drawUsersPhotos = () => {
  photoContainer.append(createPhotoPosts(createPhotoCardsData(REQUIRED_PHOTOCARDS)));
};

drawUsersPhotos();
