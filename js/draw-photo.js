import { createPhotoCardsData, REQUIRED_PHOTOCARDS } from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoPostTemplate = document.querySelector('#picture').content.querySelector('.picture');
const usersPhotoList = document.createDocumentFragment();

const createPhotoPosts = (photoCardsData) => {
  for (let i = 0; i < photoCardsData.length; i++) {
    const newPhoto = photoPostTemplate.cloneNode(true);
    const photoImg = newPhoto.querySelector('.picture__img');
    const photoComments = newPhoto.querySelector('.picture__comments');
    const photoLikes = newPhoto.querySelector('.picture__likes');
    photoImg.src = photoCardsData[i].url;
    photoImg.alt = photoCardsData[i].description;
    photoComments.textContent = photoCardsData[i].comments.length;
    photoLikes.textContent = photoCardsData[i].likes;
    usersPhotoList.append(newPhoto);
  }
};

const drawUsersPhotos = () => {
  createPhotoPosts(createPhotoCardsData(REQUIRED_PHOTOCARDS));
  photoContainer.append(usersPhotoList);
};

drawUsersPhotos();
