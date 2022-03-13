import { createPhotoCardsData, REQUIRED_PHOTOCARDS } from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoPostTemplate = document.querySelector('#picture').content.querySelector('.picture');
const usersPhotoList = document.createDocumentFragment();

const createPhotoPosts = (PhotoCardsData) => {
  for (let i = 0; i < PhotoCardsData.length; i++) {
    const newPhoto = photoPostTemplate.cloneNode(true);
    const photoImg = newPhoto.querySelector('.picture__img');
    const photoComments = newPhoto.querySelector('.picture__comments');
    const photoLikes = newPhoto.querySelector('.picture__likes');
    photoImg.src = PhotoCardsData[i].url;
    photoImg.alt = PhotoCardsData[i].description;
    photoComments.textContent = PhotoCardsData[i].comments.length;
    photoLikes.textContent = PhotoCardsData[i].likes;
    usersPhotoList.append(newPhoto);
  }
};

const drawUsersPhotos = () => {
  createPhotoPosts(createPhotoCardsData(REQUIRED_PHOTOCARDS));
  photoContainer.append(usersPhotoList);
};

drawUsersPhotos();
