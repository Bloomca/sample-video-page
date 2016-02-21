import 'babel-polyfill';
import 'whatwg-fetch';

import ready from 'utils/document-ready';
import run from './app';

ready().then(run);
