import MainPage from 'pages/main';
import store from './store';

export default function runApplication() {
  // technically, here we have to instantiate router, but it's an overhead
  // to the current task, and will take additional time.
  // won't be hard to add
  const page = new MainPage({ el: document.body, store });
  page.render();
}
