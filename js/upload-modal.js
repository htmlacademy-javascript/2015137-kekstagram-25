import { isEscapeKey } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');
const uploadFileModal = document.querySelector('body');
const uploadFileCancel = document.querySelector('#upload-cancel');
const hashTagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const effectNoneCheckbox = document.querySelector('#effect-none');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFileModal();
  }
};

const resetFormFields = () => {
  hashTagsField.value = '';
  commentField.value = '';
  effectNoneCheckbox.setAttribute('checked', 'checked');
  uploadFile.value = '';
};

const onModalHashtagFieldFocus = () => {
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onModalHashtagFieldBlur = () => {
  document.addEventListener('keydown', onModalEscKeydown);
};

const onModalCommentsFieldFocus = () => {
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onModalCommentsFieldBlur = () => {
  document.addEventListener('keydown', onModalEscKeydown);
};

function openUploadFileModal () {
  uploadFileOverlay.classList.remove('hidden');
  uploadFileModal.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  hashTagsField.addEventListener('focus', onModalHashtagFieldFocus);
  hashTagsField.addEventListener('blur', onModalHashtagFieldBlur);
  commentField.addEventListener('focus', onModalCommentsFieldFocus);
  commentField.addEventListener('blur', onModalCommentsFieldBlur);
}

function closeUploadFileModal () {
  uploadFileOverlay.classList.add('hidden');
  uploadFileModal.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  hashTagsField.removeEventListener('focus', onModalHashtagFieldFocus);
  hashTagsField.removeEventListener('blur', onModalHashtagFieldBlur);
  commentField.removeEventListener('focus', onModalCommentsFieldFocus);
  commentField.removeEventListener('blur', onModalCommentsFieldBlur);
  resetFormFields();
}

uploadFile.addEventListener('change', () => {
  openUploadFileModal();
});

uploadFileCancel.addEventListener('click', () => {
  closeUploadFileModal();
});

