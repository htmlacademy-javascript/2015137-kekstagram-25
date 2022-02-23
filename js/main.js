const getRandomRoundNumber = function (firstNumber, secondNumber) {
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
  if (typeof(currentString) === 'number') {
    currentString = String(currentString);
  }
  if (currentString.length > maxLength) {
    return false;
  }
  return true;
};
getRandomRoundNumber();
checkStringLength();
