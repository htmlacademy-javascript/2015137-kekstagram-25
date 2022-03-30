import { isEscapeKey } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadFileOverlay = document.querySelector('.img-upload__overlay');
const uploadFileModal = document.querySelector('body');
const uploadFileCancel = document.querySelector('#upload-cancel');
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
const photoEffectNone = document.querySelector('#effect-none');
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
  NONE: 'none',
  CHROME: 'grayscale',
  SEPIA: 'sepia',
  MARVIN: 'invert',
  PHOBOS: 'blur',
  HEAT: 'brightness',
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
    photoEffectImage.style.filter = `${PhotoFilter.CHROME}(${sliderElementInputValue.value})`;
  });
};

const setSepiaIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.SEPIA}(${sliderElementInputValue.value})`;
  });
};

const setMarvinIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.MARVIN}(${sliderElementInputValue.value}%)`;
  });
};

const setPhobosIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.PHOBOS}(${sliderElementInputValue.value}px)`;
  });
};

const setHeatIntensity = () => {
  intensitySliderElement.noUiSlider.on('update.filter', () => {
    photoEffectImage.style.filter = `${PhotoFilter.HEAT}(${sliderElementInputValue.value})`;
  });
};

const resetImageFilter = () => {
  photoEffectImage.className = 'img-upload__preview';
  photoEffectImage.style.filter = '';
  intensitySliderElement.style.display = 'block';
  intensitySliderElement.noUiSlider.off('update.filter');
};

const PhotoEffectChromeApply = () => {
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

const PhotoEffectSepiaApply = () => {
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

const PhotoEffectMarvinApply = () => {
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

const PhotoEffectPhobosApply = () => {
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

const PhotoEffectHeatApply = () => {
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
  if (evt.target.value === photoEffectNone.value) {
    intensitySliderElement.style.display = 'none';
    photoEffectImage.style.filter = '';
  }
  if (evt.target.value === photoEffectChrome.value) {
    PhotoEffectChromeApply();
  }
  if (evt.target.value === photoEffectSepia.value) {
    PhotoEffectSepiaApply();
  }
  if (evt.target.value === photoEffectMarvin.value) {
    PhotoEffectMarvinApply();
  }
  if (evt.target.value === photoEffectPhobos.value) {
    PhotoEffectPhobosApply();
  }
  if (evt.target.value === photoEffectHeat.value) {
    PhotoEffectHeatApply();
  }
};

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

uploadFile.addEventListener('change', () => {
  openUploadFileModal();
});

uploadFileCancel.addEventListener('click', () => {
  closeUploadFileModal();
});

