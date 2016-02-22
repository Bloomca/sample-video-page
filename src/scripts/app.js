import 'styles/common.sass';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import MainPage from 'pages/main';
import store from './store';

export default function runApplication() {
  render(
    <Provider store={store}>
      <MainPage />
    </Provider>,
    document.getElementById('app')
  );
}
