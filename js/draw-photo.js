import { photoCardsData } from './data.js';

const photoContainer = document.querySelector('.pictures');
const photoPostTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoPostList = document.createDocumentFragment();

const createPhotoPost = (photoCards) => {
  for (let i = 0; i < photoCards.length; i++) {
    const somePhoto = photoPostTemplate.cloneNode(true);
    const photoUrl = somePhoto.querySelector('.picture__img');
    const photoCcomments = somePhoto.querySelector('.picture__comments');
    const photoLikes = somePhoto.querySelector('.picture__likes');
    photoUrl.src = photoCards[i].url;
    photoCcomments.textContent = photoCards[i].comments.length;
    photoLikes.textContent = photoCards[i].likes;
    photoPostList.append(somePhoto);
  }
};

createPhotoPost(photoCardsData);
photoContainer.append(photoPostList);
