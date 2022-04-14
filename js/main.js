import './util.js';
import './upload-modal.js';
import './data-api.js';
import './draw-photo.js';
import './upload-form.js';
import './filter.js';
import { getUsersData } from './data-api.js';
import { getPhotoPostsData } from './draw-photo.js';
import { showLoadErrorMessage } from './util.js';

const initiateMainPage = () => {
  getUsersData(getPhotoPostsData, showLoadErrorMessage);
};

initiateMainPage();
