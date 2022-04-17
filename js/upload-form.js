import { uploadUserData } from './data-api.js';
import { openErrorUploadModal, openSuccessUploadModal, showLoadingMessage, closeLoadingMessage } from './upload-modal.js';

const HASHTAG_PATTERN = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const EMPTY_SPACES_PATTERN = /\s+/g;
const MAX_HASHTAGS = 5;

const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__hashtag__error'
});

const checkElementDublicates = (elements) => {
  const uniqHashtags = new Set(elements);
  return (elements.length === uniqHashtags.size);
};

const checkEachElementPattern = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    if (!HASHTAG_PATTERN.test(elements[i])) {
      return false;
    }
  }
  return true;
};

const validateHashTags = (fieldValue) => {
  if (!fieldValue) {
    return true;
  }
  const splitedElements = fieldValue.toLowerCase().trim().replace(EMPTY_SPACES_PATTERN, ' ').split(' ');
  return (splitedElements.length <= MAX_HASHTAGS && checkEachElementPattern(splitedElements) && checkElementDublicates(splitedElements));
};

const getHashtagsErrorMessage = () => 'Не корректный хештег';

pristine.addValidator(uploadForm.querySelector('.text__hashtags'),
  validateHashTags,
  getHashtagsErrorMessage
);

const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    showLoadingMessage();
    uploadUserData(
      () => {
        closeLoadingMessage();
        openSuccessUploadModal();
      },
      () => {
        closeLoadingMessage();
        openErrorUploadModal();
      },
      new FormData(evt.target)
    );
  }
};

const removeListenerFromSubmit = () => {
  uploadForm.removeEventListener('submit', onSubmitButtonClick, {once: true});
};

const setListenerOnSubmit = () => {
  uploadForm.addEventListener('submit', onSubmitButtonClick, {once: true});
};

export {setListenerOnSubmit, removeListenerFromSubmit};
