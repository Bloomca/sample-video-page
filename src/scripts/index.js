import 'babel-polyfill';
import 'whatwg-fetch';

import 'video.js/dist/video-js.min.css';

import ready from 'utils/document-ready';
import run from './app';

ready().then(run);
