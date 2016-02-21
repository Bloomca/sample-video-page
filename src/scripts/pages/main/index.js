import { loadMovies } from 'redux/modules/movies/actions';

import template from './template.html';

class MainPage {
  constructor({ el, store }) {
    this.el = el;
    store.dispatch(loadMovies());
    this.unsubscribe = store.subscribe(() => {
      // TODO add updates to nested components
    });
  }

  render() {
    this.el.innerHTML = template;
  }
}

export default MainPage;
