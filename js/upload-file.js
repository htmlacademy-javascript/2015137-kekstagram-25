const VALID_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];

const pickedUserImage = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('div.img-upload__preview img');

const onUploadFileChange = () => {
  const pickedFile = pickedUserImage.files[0];
  const fileName = pickedFile.name.toLowerCase();
  const checkFiledExtension = VALID_EXTENSIONS.some((extension) => fileName.endsWith(extension));
  if (checkFiledExtension) {
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
  }
};

pickedUserImage.addEventListener('change', onUploadFileChange);
