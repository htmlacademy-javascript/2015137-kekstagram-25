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
const scaleControlInputValue = document.querySelector('.scale__control--value');
const intensitySliderElement = document.querySelector('.effect-level__slider');
const sliderElementInputValue = document.querySelector('.effect-level__value');
const photoEffectNone = document.querySelector('#effect-none');
const photoEffectChrome = document.querySelector('#effect-chrome');
const photoEffectSepia = document.querySelector('#effect-sepia');
const photoEffectMarvin = document.querySelector('#effect-marvin');
const photoEffectPhobos = document.querySelector('#effect-phobos');
const photoEffectHeat = document.querySelector('#effect-heat');
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const createSlider = () => {
  intensitySliderElement.style.display = 'none';
  noUiSlider.create(intensitySliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
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

const changePreviewImageScale = () => {
  photoEffectImage.style.transform = `scale(${parseInt(scaleControlInputValue.value, 10) / 100})`;
};

const resetImageFilter = () => {
  photoEffectImage.className = 'img-upload__preview';
  intensitySliderElement.style.display = 'block';
};

const onPhotoEffectNoneClick = (evt) => {
  resetImageFilter();
  if (evt.target.checked) {
    intensitySliderElement.style.display = 'none';
    photoEffectImage.style.filter = 'none';
  }
};

const onPhotoEffectChromeClick = (evt) => {
  resetImageFilter();
  if (evt.target.checked) {
    intensitySliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      step: 0.1,
      connect: 'lower',
    });
    photoEffectImage.classList.add('effects__preview--chrome');
  }
};

const onPhotoEffectSepiaClick = (evt) => {
  resetImageFilter();
  if (evt.target.checked) {
    intensitySliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      step: 0.1,
      connect: 'lower',
    });
    photoEffectImage.classList.add('effects__preview--sepia');
  }
};

const onPhotoEffectMarvinClick = (evt) => {
  resetImageFilter();
  if (evt.target.checked) {
    intensitySliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      step: 0.1,
      connect: 'lower',
    });
    photoEffectImage.classList.add('effects__preview--marvin');
  }
};

const onPhotoEffectPhobosClick = (evt) => {
  resetImageFilter();
  if (evt.target.checked) {
    intensitySliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      step: 0.1,
      connect: 'lower',
    });
    photoEffectImage.classList.add('effects__preview--phobos');
  }
};

const onPhotoEffectHeatClick = (evt) => {
  resetImageFilter();
  if (evt.target.checked) {
    intensitySliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 10,
      },
      step: 0.1,
      connect: 'lower',
    });
    photoEffectImage.classList.add('effects__preview--heat');
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

const onScaleControlIncreaseClick = () => {
  const parsedScaleValue = parseInt(scaleControlInputValue.value, 10);
  if (parsedScaleValue !== MAX_SCALE_VALUE) {
    scaleControlInputValue.value = `${parsedScaleValue + 25  }%`;
    changePreviewImageScale();
  }
};

const onScaleControlDecreaseClick = () => {
  const parsedScaleValue = parseInt(scaleControlInputValue.value, 10);
  if (parsedScaleValue !== MIN_SCALE_VALUE) {
    scaleControlInputValue.value = `${parsedScaleValue - 25  }%`;
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
  photoEffectNone.addEventListener('change', onPhotoEffectNoneClick);
  photoEffectChrome.addEventListener('change', onPhotoEffectChromeClick);
  photoEffectSepia.addEventListener('change', onPhotoEffectSepiaClick);
  photoEffectMarvin.addEventListener('change', onPhotoEffectMarvinClick);
  photoEffectPhobos.addEventListener('change', onPhotoEffectPhobosClick);
  photoEffectHeat.addEventListener('change', onPhotoEffectHeatClick);
  hashTagsField.addEventListener('focus', onModalHashtagFieldFocus);
  hashTagsField.addEventListener('blur', onModalHashtagFieldBlur);
  commentField.addEventListener('focus', onModalCommentsFieldFocus);
  commentField.addEventListener('blur', onModalCommentsFieldBlur);
}

function closeUploadFileModal () {
  uploadFileOverlay.classList.add('hidden');
  uploadFileModal.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
  scaleControlButtonIncrease.removeEventListener('click', onScaleControlIncreaseClick);
  scaleControlButtonDecrease.removeEventListener('click', onScaleControlDecreaseClick);
  photoEffectNone.removeEventListener('change', onPhotoEffectNoneClick);
  photoEffectChrome.removeEventListener('change', onPhotoEffectChromeClick);
  photoEffectSepia.removeEventListener('change', onPhotoEffectSepiaClick);
  photoEffectMarvin.removeEventListener('change', onPhotoEffectMarvinClick);
  photoEffectPhobos.removeEventListener('change', onPhotoEffectPhobosClick);
  photoEffectHeat.removeEventListener('change', onPhotoEffectHeatClick);
  hashTagsField.removeEventListener('focus', onModalHashtagFieldFocus);
  hashTagsField.removeEventListener('blur', onModalHashtagFieldBlur);
  commentField.removeEventListener('focus', onModalCommentsFieldFocus);
  commentField.removeEventListener('blur', onModalCommentsFieldBlur);
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

