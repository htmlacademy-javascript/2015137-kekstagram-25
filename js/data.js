import { getRandomRoundNumber, getRandomArrayElement } from './util.js';

const REQUIRED_PHOTOCARDS = 25;
const MAX_ID_NUMBER = 9999;
const MAX_PHOTO_COMMENTS = 3;
const MIN_PHOTO_LIKES = 15;
const MAX_PHOTO_LIKES = 200;
const usedCommentsIds = [];

const PHOTO_DESCRIPTIONS = [
  'Современная квартира', 'Подвал', 'Картина', 'Пещера', 'Город', 'Небо', 'Чердак', 'Улица', 'Водопад', 'Сад', 'Океан'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTS_AUTORS_NAMES = [
  'Ярослав', 'Владислав', 'Ульяна', 'София', 'Арсений', 'Майя', 'Дмитрий', 'Владимир', 'Мария', 'Николай', 'Тимофей', 'Валентина'
];

const getNewCommentId = () => {
  let newId = getRandomRoundNumber(0, MAX_ID_NUMBER);
  while (usedCommentsIds.includes(newId)) {
    newId = getRandomRoundNumber(0, MAX_ID_NUMBER);
  }
  usedCommentsIds.push(newId);
  return newId;
};

const createPhotoCardComment = () => ({
  id: getNewCommentId(),
  avatar: `img/avatar-${  getRandomRoundNumber(1, 6)  }.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(COMMENTS_AUTORS_NAMES)
});

const getPhotoComments = () => {
  const photoCommentsNumber = getRandomRoundNumber(1, MAX_PHOTO_COMMENTS);
  const photoCommments = [];
  for (let j = 0; j < photoCommentsNumber; j++) {
    photoCommments[j] = createPhotoCardComment();
  }
  return photoCommments;
};

const createPhotoCardDescription = (cardIndex) => ({
  id: cardIndex + 1,
  url: `photos/${  cardIndex + 1  }.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomRoundNumber(MIN_PHOTO_LIKES, MAX_PHOTO_LIKES),
  comments: getPhotoComments(),
});

const createPhotoCardsData = (cardsAmount) => {
  const photoCardsData = [];
  for (let i = 0; i < cardsAmount; i++) {
    photoCardsData[i] = createPhotoCardDescription(i);
  }
  return photoCardsData;
};

export {createPhotoCardsData, REQUIRED_PHOTOCARDS};
