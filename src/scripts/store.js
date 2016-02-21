/* global __DEV__ */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'redux/reducers';
import createLogger from 'redux-logger';
const logger = createLogger();

export default createStore(
  reducers,
  applyMiddleware.apply(null, __DEV__ ? [thunk, logger] : [thunk])
);
