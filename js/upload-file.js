const pickedUserImage = document.querySelector('.img-upload__input');
const imagePreviewElement = document.querySelector('div.img-upload__preview img');
const VALID_EXTENSIONS = ['gif', 'jpg', 'jpeg', 'png'];

const checkFileExtension = (fileToCheck, validExtensions) => {
  validExtensions.some((extension) => fileToCheck.endsWith(extension));
};

const onUploadFileChange = () => {
  const pickedFile = pickedUserImage.files[0];
  const fileName = pickedFile.name.toLowerCase();

  if (checkFileExtension(fileName, VALID_EXTENSIONS)) {
      console.log('valid');
    imagePreviewElement.src = URL.createObjectURL(pickedFile);
  }
  console.log('not Valid');
};

pickedUserImage.addEventListener('change', onUploadFileChange);
