import { createPhotoCardsData, REQUIRED_PHOTOCARDS } from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoPostTemplate = document.querySelector('#picture').content.querySelector('.picture');
const UsersPhotoList = document.createDocumentFragment();

const createPhotoPosts = (PhotoCardsData) => {
  for (let i = 0; i < PhotoCardsData.length; i++) {
    const newPhoto = photoPostTemplate.cloneNode(true);
    const photoUrl = newPhoto.querySelector('.picture__img');
    const photoComments = newPhoto.querySelector('.picture__comments');
    const photoLikes = newPhoto.querySelector('.picture__likes');
    photoUrl.src = PhotoCardsData[i].url;
    photoComments.textContent = PhotoCardsData[i].comments.length;
    photoLikes.textContent = PhotoCardsData[i].likes;
    UsersPhotoList.append(newPhoto);
  }
};

const drawUsersPhotos = () => {
  createPhotoPosts(createPhotoCardsData(REQUIRED_PHOTOCARDS));
  photoContainer.append(UsersPhotoList);
};

drawUsersPhotos();
