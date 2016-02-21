// redux declaration
import { loadMovies } from 'redux/modules/movies/actions';

// components declaration
import MoviesBlock from 'components/movies-block';

// html & css declaration
import template from './template.html';

class MainPage {
  constructor({ el, store }) {
    this.el = el;
    this.store = store;
    store.dispatch(loadMovies());
    this.unsubscribe = store.subscribe(() => {
      const { movies } = this.store.getState();
      this.moviesBlock.update(movies.items);
    });
  }

  render() {
    const { movies } = this.store.getState();
    this.el.innerHTML = template;
    this.moviesBlock = new MoviesBlock({
      el: this.el.querySelector('#movies-container'),
      movies: movies.items
    });
    this.moviesBlock.render();
  }
}

export default MainPage;
