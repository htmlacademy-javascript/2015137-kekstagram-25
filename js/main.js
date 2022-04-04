import './util.js';
import './upload-modal.js';
import './data-api.js';
import './draw-photo.js';
import './upload-form.js';
import { getUsersData } from './data-api.js';
import { createPhotoPosts } from './draw-photo.js';
import { showLoadErrorMessage } from './util.js';

getUsersData(createPhotoPosts, showLoadErrorMessage);
