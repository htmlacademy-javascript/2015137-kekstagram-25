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
const checkStringLength = function (currentString, maxLength) {
  if (currentString.length > maxLength) {
    return false;
  }
  return true;
};

getRandomRoundNumber();
checkStringLength();
