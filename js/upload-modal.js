import { isEscapeKey } from './util.js';
import { checkUserForm } from './upload-form.js';

const uploadFile = document.querySelector('#upload-file');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');
const uploadFileModal = document.querySelector('body');
const uploadFileCancel = document.querySelector('#upload-cancel');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const submitButton = document.querySelector('.img-upload__submit');
const hashTagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const photoEffectImage = document.querySelector('.img-upload__preview');
const effectNoneCheckbox = document.querySelector('#effect-none');
const scaleControlButtonIncrease = document.querySelector('.scale__control--bigger');
const scaleControlButtonDecrease = document.querySelector('.scale__control--smaller');
const scaleControlInput = document.querySelector('.scale__control--value');
const intensitySliderElement = document.querySelector('.effect-level__slider');
const sliderElementInputValue = document.querySelector('.effect-level__value');
const radioButtonsFieldSet = document.querySelector('.img-upload__effects');
const photoEffectChrome = document.querySelector('#effect-chrome');
const photoEffectSepia = document.querySelector('#effect-sepia');
const photoEffectMarvin = document.querySelector('#effect-marvin');
const photoEffectPhobos = document.querySelector('#effect-phobos');
const photoEffectHeat = document.querySelector('#effect-heat');
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_RANGE = 3;
const MIN_STEP = 0.1;
const DECIMAL = 10;
const PhotoFilter = {
  NONE: {name: 'none', units: ''},
  CHROME: {name: 'grayscale', units: ''},
  SEPIA: {name: 'sepia', units: ''},
  MARVIN: {name: 'invert', units: '%'},
  PHOBOS: {name: 'blur', units: 'px'},
  HEAT: {name: 'brightness', units: ''}
};

const createSlider = () => {
  intensitySliderElement.style.display = 'none';
  noUiSlider.create(intensitySliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: MIN_STEP,
    step: MIN_STEP,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const removeSlider = () => {
  intensitySliderElement.noUiSlider.destroy();
};

const attachSliderToInput = () => {
  intensitySliderElement.noUiSlider.on('update', () => {
    sliderElementInputValue.value = intensitySliderElement.noUiSlider.get();
  });
};

const removeSliderToInput = () => {
  intensitySliderElement.noUiSlider.off('update');
};

const setChromeIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.CHROME.name}(${sliderElementInputValue.value}${PhotoFilter.CHROME.units})`;
  });
};

const setSepiaIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.SEPIA.name}(${sliderElementInputValue.value}${PhotoFilter.SEPIA.units})`;
  });
};

const setMarvinIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.MARVIN.name}(${sliderElementInputValue.value}${PhotoFilter.MARVIN.units})`;
  });
};

const setPhobosIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.PHOBOS.name}(${sliderElementInputValue.value}${PhotoFilter.PHOBOS.units})`;
  });
};

const setHeatIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.HEAT.name}(${sliderElementInputValue.value}${PhotoFilter.HEAT.units})`;
  });
};

const resetImageFilter = () => {
  photoEffectImage.className = 'img-upload__preview';
  photoEffectImage.style.filter = '';
  intensitySliderElement.style.display = 'block';
  intensitySliderElement.noUiSlider.off('update.filter');
};

const photoEffectChromeApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: MIN_STEP,
  });
  photoEffectImage.classList.add('effects__preview--chrome');
  setChromeIntensity();
};

const photoEffectSepiaApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: MIN_STEP,
  });
  photoEffectImage.classList.add('effects__preview--sepia');
  setSepiaIntensity();
};

const photoEffectMarvinApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_SCALE_VALUE,
    },
    start: MAX_SCALE_VALUE,
    step: 1,
  });
  photoEffectImage.classList.add('effects__preview--marvin');
  setMarvinIntensity();
};

const photoEffectPhobosApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_RANGE,
    },
    start: MAX_RANGE,
    step: MIN_STEP,
  });
  photoEffectImage.classList.add('effects__preview--phobos');
  setPhobosIntensity();
};

const photoEffectHeatApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: MAX_RANGE,
    },
    start: MAX_RANGE,
    step: MIN_STEP,
  });
  photoEffectImage.classList.add('effects__preview--heat');
  setHeatIntensity();
};

const onPhotoEffectClick = (evt) => {
  resetImageFilter();
  switch (evt.target.value) {
    case (photoEffectChrome.value):
      photoEffectChromeApply();
    break

    case (photoEffectSepia.value):
      photoEffectSepiaApply();
    break

    case (photoEffectMarvin.value): 
      photoEffectMarvinApply();
    break

    case (photoEffectPhobos.value):
      photoEffectPhobosApply();
    break

    case (photoEffectHeat.value):
      photoEffectHeatApply();
    break

    default:
      intensitySliderElement.style.display = 'none';
      photoEffectImage.style.filter = '';
    break
  }
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFileModal();
  }
};

const onSuccessEscKeydown = (evt) => { 
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessUploadModal();
  }
};

const onErrorEscKeydown = (evt) => { 
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorUploadModal();
  }
};

const resetFormFields = () => {
  hashTagsField.value = '';
  commentField.value = '';
  effectNoneCheckbox.setAttribute('checked', 'checked');
  uploadFile.value = '';
};

const changePreviewImageScale = () => {
  photoEffectImage.style.transform = `scale(${parseInt(scaleControlInput.value, DECIMAL) / MAX_SCALE_VALUE})`;
};

const resetPreviewImageScale = () => {
  scaleControlInput.value = '100%';
  photoEffectImage.style.transform = '';
};

const onScaleControlIncreaseClick = () => {
  const parsedScaleValue = parseInt(scaleControlInput.value, DECIMAL);
  if (parsedScaleValue !== MAX_SCALE_VALUE) {
    scaleControlInput.value = `${parsedScaleValue + MIN_SCALE_VALUE  }%`;
    changePreviewImageScale();
  }
};

const onScaleControlDecreaseClick = () => {
  const parsedScaleValue = parseInt(scaleControlInput.value, DECIMAL);
  if (parsedScaleValue !== MIN_SCALE_VALUE) {
    scaleControlInput.value = `${parsedScaleValue - MIN_SCALE_VALUE  }%`;
    changePreviewImageScale();
  }
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
  createSlider();
  attachSliderToInput();
  scaleControlButtonIncrease.addEventListener('click', onScaleControlIncreaseClick);
  scaleControlButtonDecrease.addEventListener('click', onScaleControlDecreaseClick);
  radioButtonsFieldSet.addEventListener('change', onPhotoEffectClick);
  hashTagsField.addEventListener('focus', onModalHashtagFieldFocus);
  hashTagsField.addEventListener('blur', onModalHashtagFieldBlur);
  commentField.addEventListener('focus', onModalCommentsFieldFocus);
  commentField.addEventListener('blur', onModalCommentsFieldBlur);
  checkUserForm();
}

function closeUploadFileModal () {
  uploadFileOverlay.classList.add('hidden');
  uploadFileModal.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  hashTagsField.removeEventListener('focus', onModalHashtagFieldFocus);
  hashTagsField.removeEventListener('blur', onModalHashtagFieldBlur);
  commentField.removeEventListener('focus', onModalCommentsFieldFocus);
  commentField.removeEventListener('blur', onModalCommentsFieldBlur);
  resetPreviewImageScale();
  resetImageFilter();
  removeSliderToInput();
  removeSlider();
  resetFormFields();
}

const showLoadingMessage = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Загружаем';
};

const closeLoadingMessage = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onClickOutsideSuccessModal = (evt) => {
  const currentElement = evt.target;
  if (!currentElement.closest('.success__inner')) {
    closeSuccessUploadModal();
  }
};

function openSuccessUploadModal () {
  closeUploadFileModal();
  const successModal = successUploadTemplate.cloneNode(true);
  const closeButton = successModal.querySelector('.success__button');
  closeButton.addEventListener('click', closeSuccessUploadModal)
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onClickOutsideSuccessModal);
  document.body.appendChild(successModal);
};

function closeSuccessUploadModal () {
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onClickOutsideSuccessModal);
  document.body.lastChild.remove();
};

const onClickOutsideErrorModal = (evt) => {
  const currentElement = evt.target;
  if (!currentElement.closest('.error__inner')) {
    closeErrorUploadModal();
  }
};

function openErrorUploadModal () {
  closeUploadFileModal();
  const errorModal = errorUploadTemplate.cloneNode(true);
  const closeButton = errorModal.querySelector('.error__button');
  closeButton.addEventListener('click', closeErrorUploadModal)
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onClickOutsideErrorModal);
  document.body.appendChild(errorModal);
};

function closeErrorUploadModal () {
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onClickOutsideErrorModal);
  document.body.lastChild.remove();
};

uploadFile.addEventListener('change', () => {
  openUploadFileModal();
});

uploadFileCancel.addEventListener('click', () => {
  closeUploadFileModal();
});

export {openErrorUploadModal, openSuccessUploadModal, showLoadingMessage, closeLoadingMessage};
