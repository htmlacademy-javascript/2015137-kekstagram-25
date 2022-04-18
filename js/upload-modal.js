import { isEscapeKey } from './util.js';
import { setListenerOnSubmit, removeListenerFromSubmit } from './upload-form.js';
import { onPreviewPhotoClick, disablePreviewPhotoClick } from './draw-full-size.js';

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

const uploadFileElement = document.querySelector('#upload-file');
const uploadFileOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFileModalElement = document.querySelector('body');
const uploadFileCancelElement = document.querySelector('#upload-cancel');
const successUploadTemplateNode = document.querySelector('#success').content.querySelector('.success');
const errorUploadTemplateNode = document.querySelector('#error').content.querySelector('.error');
const submitButtonElement = document.querySelector('.img-upload__submit');
const hashTagsFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const photoEffectPreviewElement = document.querySelector('.img-upload__preview');
const effectNoneCheckboxElement = document.querySelector('#effect-none');
const scaleButtonIncreaseElement = document.querySelector('.scale__control--bigger');
const scaleButtonDecreaseElement = document.querySelector('.scale__control--smaller');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const intensitySliderElement = document.querySelector('.effect-level__slider');
const sliderInputValueElement = document.querySelector('.effect-level__value');
const radioButtonsFieldSetNode = document.querySelector('.img-upload__effects');
const photoEffectChromeElement = document.querySelector('#effect-chrome');
const photoEffectSepiaElement = document.querySelector('#effect-sepia');
const photoEffectMarvinElement = document.querySelector('#effect-marvin');
const photoEffectPhobosElement = document.querySelector('#effect-phobos');
const photoEffectHeatElement = document.querySelector('#effect-heat');

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
  if (intensitySliderElement.noUiSlider) {
    intensitySliderElement.noUiSlider.destroy();
  }
};

const attachSliderToInput = () => {
  intensitySliderElement.noUiSlider.on('update', () => {
    sliderInputValueElement.value = intensitySliderElement.noUiSlider.get();
  });
};

const setChromeIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectPreviewElement.style.filter = `${PhotoFilter.CHROME.name}(${sliderInputValueElement.value}${PhotoFilter.CHROME.units})`;
  });
};

const setSepiaIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectPreviewElement.style.filter = `${PhotoFilter.SEPIA.name}(${sliderInputValueElement.value}${PhotoFilter.SEPIA.units})`;
  });
};

const setMarvinIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectPreviewElement.style.filter = `${PhotoFilter.MARVIN.name}(${sliderInputValueElement.value}${PhotoFilter.MARVIN.units})`;
  });
};

const setPhobosIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectPreviewElement.style.filter = `${PhotoFilter.PHOBOS.name}(${sliderInputValueElement.value}${PhotoFilter.PHOBOS.units})`;
  });
};

const setHeatIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectPreviewElement.style.filter = `${PhotoFilter.HEAT.name}(${sliderInputValueElement.value}${PhotoFilter.HEAT.units})`;
  });
};

const resetImageFilter = () => {
  effectNoneCheckboxElement.setAttribute('checked', 'true');
  effectNoneCheckboxElement.checked = true;
  photoEffectPreviewElement.className = 'img-upload__preview';
  photoEffectPreviewElement.style.filter = '';
  intensitySliderElement.style.display = 'block';
};

const photoEffectChromeElementApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: MIN_STEP,
  });
  photoEffectPreviewElement.classList.add('effects__preview--chrome');
  setChromeIntensity();
};

const photoEffectSepiaElementApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: MIN_STEP,
  });
  photoEffectPreviewElement.classList.add('effects__preview--sepia');
  setSepiaIntensity();
};

const photoEffectMarvinElementApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_SCALE_VALUE,
    },
    start: MAX_SCALE_VALUE,
    step: 1,
  });
  photoEffectPreviewElement.classList.add('effects__preview--marvin');
  setMarvinIntensity();
};

const photoEffectPhobosElementApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: MAX_RANGE,
    },
    start: MAX_RANGE,
    step: MIN_STEP,
  });
  photoEffectPreviewElement.classList.add('effects__preview--phobos');
  setPhobosIntensity();
};

const photoEffectHeatElementApply = () => {
  intensitySliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: MAX_RANGE,
    },
    start: MAX_RANGE,
    step: MIN_STEP,
  });
  photoEffectPreviewElement.classList.add('effects__preview--heat');
  setHeatIntensity();
};

const onPhotoEffectClick = (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.closest('.effects__radio')) {
    resetImageFilter();
    evt.target.checked = true;
    switch (evt.target.value) {
      case (photoEffectChromeElement.value):
        photoEffectChromeElementApply();
        break;
      case (photoEffectSepiaElement.value):
        photoEffectSepiaElementApply();
        break;
      case (photoEffectMarvinElement.value):
        photoEffectMarvinElementApply();
        break;
      case (photoEffectPhobosElement.value):
        photoEffectPhobosElementApply();
        break;
      case (photoEffectHeatElement.value):
        photoEffectHeatElementApply();
        break;
      default:
        intensitySliderElement.style.display = 'none';
        photoEffectPreviewElement.style.filter = '';
        break;
    }
  }
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFileModalElement();
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
  hashTagsFieldElement.value = '';
  commentFieldElement.value = '';
  uploadFileElement.value = '';
};

const changePreviewImageScale = () => {
  photoEffectPreviewElement.style.transform = `scale(${parseInt(scaleControlInputElement.value, DECIMAL) / MAX_SCALE_VALUE})`;
};

const resetPreviewImageScale = () => {
  scaleControlInputElement.value = '100%';
  photoEffectPreviewElement.style.transform = '';
};

const onScaleControlIncreaseClick = () => {
  const parsedScaleValue = parseInt(scaleControlInputElement.value, DECIMAL);
  if (parsedScaleValue !== MAX_SCALE_VALUE) {
    scaleControlInputElement.value = `${parsedScaleValue + MIN_SCALE_VALUE  }%`;
    changePreviewImageScale();
  }
};

const onScaleControlDecreaseClick = () => {
  const parsedScaleValue = parseInt(scaleControlInputElement.value, DECIMAL);
  if (parsedScaleValue !== MIN_SCALE_VALUE) {
    scaleControlInputElement.value = `${parsedScaleValue - MIN_SCALE_VALUE  }%`;
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

function openUploadFileModalElement () {
  disablePreviewPhotoClick();
  uploadFileOverlayElement.classList.remove('hidden');
  uploadFileModalElement.classList.add('modal-open');
  uploadFileCancelElement.addEventListener('click', closeUploadFileModalElement);
  document.addEventListener('keydown', onModalEscKeydown);
  createSlider();
  attachSliderToInput();
  scaleButtonIncreaseElement.addEventListener('click', onScaleControlIncreaseClick);
  scaleButtonDecreaseElement.addEventListener('click', onScaleControlDecreaseClick);
  radioButtonsFieldSetNode.addEventListener('change', onPhotoEffectClick);
  hashTagsFieldElement.addEventListener('focus', onModalHashtagFieldFocus);
  hashTagsFieldElement.addEventListener('blur', onModalHashtagFieldBlur);
  commentFieldElement.addEventListener('focus', onModalCommentsFieldFocus);
  commentFieldElement.addEventListener('blur', onModalCommentsFieldBlur);
  setListenerOnSubmit();
}

function closeUploadFileModalElement () {
  uploadFileOverlayElement.classList.add('hidden');
  uploadFileModalElement.classList.remove('modal-open');
  uploadFileCancelElement.removeEventListener('click', closeUploadFileModalElement);
  document.removeEventListener('keydown', onModalEscKeydown);
  hashTagsFieldElement.removeEventListener('focus', onModalHashtagFieldFocus);
  hashTagsFieldElement.removeEventListener('blur', onModalHashtagFieldBlur);
  commentFieldElement.removeEventListener('focus', onModalCommentsFieldFocus);
  commentFieldElement.removeEventListener('blur', onModalCommentsFieldBlur);
  removeListenerFromSubmit();
  resetImageFilter();
  resetPreviewImageScale();
  removeSlider();
  resetFormFields();
  onPreviewPhotoClick();
}

const showLoadingMessage = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Загружаем';
};

const closeLoadingMessage = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const onClickOutsideSuccessModal = (evt) => {
  const currentElement = evt.target;
  if (!currentElement.closest('.success__inner')) {
    closeSuccessUploadModal();
  }
};

function openSuccessUploadModal () {
  const successModal = successUploadTemplateNode.cloneNode(true);
  const closeButton = successModal.querySelector('.success__button');
  closeButton.addEventListener('click', closeSuccessUploadModal);
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', onClickOutsideSuccessModal);
  document.body.appendChild(successModal);
  closeUploadFileModalElement();
}

function closeSuccessUploadModal () {
  document.removeEventListener('keydown', onSuccessEscKeydown);
  document.removeEventListener('click', onClickOutsideSuccessModal);
  document.body.lastChild.remove();
}

const onClickOutsideErrorModal = (evt) => {
  const currentElement = evt.target;
  if (!currentElement.closest('.error__inner')) {
    closeErrorUploadModal();
  }
};

function openErrorUploadModal () {
  const errorModal = errorUploadTemplateNode.cloneNode(true);
  const closeButton = errorModal.querySelector('.error__button');
  closeButton.addEventListener('click', closeErrorUploadModal);
  document.addEventListener('keydown', onErrorEscKeydown);
  document.addEventListener('click', onClickOutsideErrorModal);
  document.body.appendChild(errorModal);
  closeUploadFileModalElement();
}

function closeErrorUploadModal () {
  document.removeEventListener('keydown', onErrorEscKeydown);
  document.removeEventListener('click', onClickOutsideErrorModal);
  document.body.lastChild.remove();
}
const setUploadForm = () => {
  uploadFileElement.addEventListener('change', openUploadFileModalElement);
};

export {openErrorUploadModal, openSuccessUploadModal, showLoadingMessage, closeLoadingMessage, setUploadForm, uploadFileModalElement, closeUploadFileModalElement};
