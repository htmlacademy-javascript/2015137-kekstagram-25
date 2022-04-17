const ERROR_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomRoundNumber = (firstNumber, secondNumber) => {
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

const getRandomArrayElement = (elements) => elements[getRandomRoundNumber(0, elements.length - 1)];

const showLoadErrorMessage = (errorText) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('.user-data__load__error');
  errorContainer.textContent = errorText;
  document.body.append(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const shuffleArrayElements = (someArray) => {
  for (let i = 0; i < someArray.length - 1; i++) {
    const j = getRandomRoundNumber(0, 1) * (i + 1);
    [someArray[i], someArray[j]] = [someArray[j], someArray[i]];
  }
};

const debounce = (cb, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeoutDelay);
  };
};

export {getRandomRoundNumber, getRandomArrayElement, isEscapeKey, showLoadErrorMessage, shuffleArrayElements, debounce};
