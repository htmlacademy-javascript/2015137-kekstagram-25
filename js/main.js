import './util.js';
import './upload-modal.js';
import './data-api.js';
import './draw-photo.js';
import './upload-form.js';
import './filter.js';
import './draw-full-size.js';
import './upload-file.js';

import { getUsersData } from './data-api.js';
import { getPhotoPostsData } from './draw-photo.js';
import { showLoadErrorMessage } from './util.js';
import { setUploadForm } from './upload-modal.js';
import { setPreviewPhotoClickListener } from './draw-full-size.js';

const setMainPage = () => {
  setUploadForm();
  setPreviewPhotoClickListener();
};

const initiateMainPage = () => {
  getUsersData(getPhotoPostsData, showLoadErrorMessage);
  setMainPage();
};

initiateMainPage();
