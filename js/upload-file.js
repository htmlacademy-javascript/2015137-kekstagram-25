const EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];

const pickedUserImageElement = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('div.img-upload__preview img');

const makeUrlFromUploadFile = () => {
  const pickedFile = pickedUserImageElement.files[0];
  const fileName = pickedFile.name.toLowerCase();
  const checkFileExtension = EXTENSIONS.some((extension) => fileName.endsWith(extension));
  if (checkFileExtension) {
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
  }
};

pickedUserImageElement.addEventListener('change', makeUrlFromUploadFile);
