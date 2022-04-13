import { getDefaultPhotoPostData } from './filter.js';

const photoContainerElement = document.querySelector('.pictures');
const photoPostTemplate = document.querySelector('#picture').content.querySelector('.picture');

const drawPhotoPosts = (photoCardsData) => {
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
  return photoContainerElement.append(usersPhotoList);
};

const getPhotoPostsData = (recivedData) => {
  getDefaultPhotoPostData(recivedData);
  drawPhotoPosts(recivedData);
};

const clearPhotoPosts = () => {
  photoContainerElement.querySelectorAll('.picture').forEach((photoPost) => photoPost.remove());
};

export {getPhotoPostsData, clearPhotoPosts, drawPhotoPosts};
