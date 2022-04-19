import { isEscapeKey } from './util.js';
import { setListenerOnSubmit} from './upload-form.js';
import { setPreviewPhotoClickListener, disablePreviewPhotoClickListener } from './draw-full-size.js';

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

const applyPhotoEffectChrome = () => {
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

const applyPhotoEffectSepia = () => {
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

const applyPhotoEffectMarvin = () => {
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

const applyPhotoEffectPhobos = () => {
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

const applyPhotoEffectHeat = () => {
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

const pickClickedPhotoEffect = (evt) => {
  const clickedElement = evt.target;
  if (clickedElement.closest('.effects__radio')) {
    resetImageFilter();
    evt.target.checked = true;
    switch (evt.target.value) {
      case (photoEffectChromeElement.value):
        applyPhotoEffectChrome();
        break;
      case (photoEffectSepiaElement.value):
        applyPhotoEffectSepia();
        break;
      case (photoEffectMarvinElement.value):
        applyPhotoEffectMarvin();
        break;
      case (photoEffectPhobosElement.value):
        applyPhotoEffectPhobos();
        break;
      case (photoEffectHeatElement.value):
        applyPhotoEffectHeat();
        break;
      default:
        intensitySliderElement.style.display = 'none';
        photoEffectPreviewElement.style.filter = '';
        break;
    }
  }
};

const checkModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadFileModalElement();
  }
};

const checkSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessUploadModal();
  }
};

const checkErrorEscKeydown = (evt) => {
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

const increaseImageScale = () => {
  const parsedScaleValue = parseInt(scaleControlInputElement.value, DECIMAL);
  if (parsedScaleValue !== MAX_SCALE_VALUE) {
    scaleControlInputElement.value = `${parsedScaleValue + MIN_SCALE_VALUE  }%`;
    changePreviewImageScale();
  }
};

const decreaseImageScale = () => {
  const parsedScaleValue = parseInt(scaleControlInputElement.value, DECIMAL);
  if (parsedScaleValue !== MIN_SCALE_VALUE) {
    scaleControlInputElement.value = `${parsedScaleValue - MIN_SCALE_VALUE  }%`;
    changePreviewImageScale();
  }
};

const removeHashtagFieldListener = () => {
  document.removeEventListener('keydown', checkModalEscKeydown);
};

const setHashtagFieldListener = () => {
  document.addEventListener('keydown', checkModalEscKeydown);
};

const removeCommentsFieldListener = () => {
  document.removeEventListener('keydown', checkModalEscKeydown);
};

const setCommentsFieldListener = () => {
  document.addEventListener('keydown', checkModalEscKeydown);
};

function openUploadFileModalElement () {
  disablePreviewPhotoClickListener();
  uploadFileOverlayElement.classList.remove('hidden');
  uploadFileModalElement.classList.add('modal-open');
  uploadFileCancelElement.addEventListener('click', closeUploadFileModalElement);
  document.addEventListener('keydown', checkModalEscKeydown);
  createSlider();
  attachSliderToInput();
  scaleButtonIncreaseElement.addEventListener('click', increaseImageScale);
  scaleButtonDecreaseElement.addEventListener('click', decreaseImageScale);
  radioButtonsFieldSetNode.addEventListener('change', pickClickedPhotoEffect);
  hashTagsFieldElement.addEventListener('focus', removeHashtagFieldListener);
  hashTagsFieldElement.addEventListener('blur', setHashtagFieldListener);
  commentFieldElement.addEventListener('focus', removeCommentsFieldListener);
  commentFieldElement.addEventListener('blur', setCommentsFieldListener);
  setListenerOnSubmit();
}

function closeUploadFileModalElement () {
  uploadFileOverlayElement.classList.add('hidden');
  uploadFileModalElement.classList.remove('modal-open');
  uploadFileCancelElement.removeEventListener('click', closeUploadFileModalElement);
  document.removeEventListener('keydown', checkModalEscKeydown);
  hashTagsFieldElement.removeEventListener('focus', removeHashtagFieldListener);
  hashTagsFieldElement.removeEventListener('blur', setHashtagFieldListener);
  commentFieldElement.removeEventListener('focus', removeCommentsFieldListener);
  commentFieldElement.removeEventListener('blur', setCommentsFieldListener);
  resetImageFilter();
  resetPreviewImageScale();
  removeSlider();
  resetFormFields();
  setPreviewPhotoClickListener();
}

const showLoadingMessage = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Загружаем';
};

const closeLoadingMessage = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const checkClickOutsideSuccessModal = (evt) => {
  const currentElement = evt.target;
  if (!currentElement.closest('.success__inner')) {
    closeSuccessUploadModal();
  }
};

function openSuccessUploadModal () {
  const successModal = successUploadTemplateNode.cloneNode(true);
  const closeButton = successModal.querySelector('.success__button');
  closeButton.addEventListener('click', closeSuccessUploadModal);
  document.addEventListener('keydown', checkSuccessEscKeydown);
  document.addEventListener('click', checkClickOutsideSuccessModal);
  document.body.appendChild(successModal);
  closeUploadFileModalElement();
}

function closeSuccessUploadModal () {
  document.removeEventListener('keydown', checkSuccessEscKeydown);
  document.removeEventListener('click', checkClickOutsideSuccessModal);
  document.body.lastChild.remove();
}

const checkClickOutsideErrorModal = (evt) => {
  const currentElement = evt.target;
  if (!currentElement.closest('.error__inner')) {
    closeErrorUploadModal();
  }
};

function openErrorUploadModal () {
  const errorModal = errorUploadTemplateNode.cloneNode(true);
  const closeButton = errorModal.querySelector('.error__button');
  closeButton.addEventListener('click', closeErrorUploadModal);
  document.addEventListener('keydown', checkErrorEscKeydown);
  document.addEventListener('click', checkClickOutsideErrorModal);
  document.body.appendChild(errorModal);
  closeUploadFileModalElement();
}

function closeErrorUploadModal () {
  document.removeEventListener('keydown', checkErrorEscKeydown);
  document.removeEventListener('click', checkClickOutsideErrorModal);
  document.body.lastChild.remove();
}
const setUploadForm = () => {
  uploadFileElement.addEventListener('change', openUploadFileModalElement);
};

export {openErrorUploadModal, openSuccessUploadModal, showLoadingMessage, closeLoadingMessage, setUploadForm, uploadFileModalElement, closeUploadFileModalElement};
