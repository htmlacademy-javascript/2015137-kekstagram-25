const requiredPhotoCardsNumber = 25;
const usedCommentsIds = [];

const getRandomRoundNumber = function (firstNumber, secondNumber) {
  if (firstNumber < 0 || secondNumber < 0) {
    return;
  }
  firstNumber = Math.ceil(firstNumber);
  secondNumber = Math.floor(secondNumber);
  if (firstNumber === secondNumber) {
    return firstNumber;
  }
  if (firstNumber < secondNumber) {
    return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
  }
  return Math.floor(Math.random() * (firstNumber - secondNumber + 1)) + secondNumber;
};

const checkStringLength = function (string, maxLength) {
  return (string.length <= maxLength);
};

checkStringLength('some', 10);

const photoDescriptions = [
  'Современная квартира', 'Подвал', 'Картина', 'Пещера', 'Город', 'Небо', 'Чердак', 'Улица', 'Водопад', 'Сад', 'Океан'
];

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const commentsAuthorsNames = [
  'Ярослав', 'Владислав', 'Ульяна', 'София', 'Арсений', 'Майя', 'Дмитрий', 'Владимир', 'Мария', 'Николай', 'Тимофей', 'Валентина'
];

const getNewCommentId = () => {
  let newId = getRandomRoundNumber(0, 9999);
  while (usedCommentsIds.includes(newId)) {
    newId = getRandomRoundNumber(0, 9999);
  }
  usedCommentsIds.push(newId);
  return newId;
};

const createPhotoCardDescription = function(cardsAmount) {
  const photoCards = [];
  for (let i = 0; i < cardsAmount; i++){
    photoCards[i] = {
      id: i + 1,
      url: `photos/${  i + 1  }.jpg`,
      description: photoDescriptions[getRandomRoundNumber(0, photoDescriptions.length - 1)],
      likes: getRandomRoundNumber(15, 200),
      comments: []
    };
    const photoCommentsNumber = getRandomRoundNumber(1, 3);
    for (let j = 0; j < photoCommentsNumber; j++) {
      photoCards[i].comments[j] = {
        id: getNewCommentId(),
        avatar: `img/avatar-${  getRandomRoundNumber(1, 6)  }.svg`,
        message: comments[getRandomRoundNumber(0, comments.length - 1)],
        name: commentsAuthorsNames[getRandomRoundNumber(0, commentsAuthorsNames.length - 1)]
      };
    }
  }
  return photoCards;
};

createPhotoCardDescription(requiredPhotoCardsNumber);
