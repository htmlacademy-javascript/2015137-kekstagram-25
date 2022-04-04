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

const checkStringLength = (string, maxLength) => (string.length <= maxLength);

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

checkStringLength('some', 10);

export {getRandomRoundNumber, getRandomArrayElement, isEscapeKey, showLoadErrorMessage};
