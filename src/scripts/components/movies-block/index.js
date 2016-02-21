import MovieTile from 'components/movie-tile';

import './style.sass';

import { template as createTemplate } from 'lodash';
import tmpl from './template.html';

const template = createTemplate(tmpl);

class MoviesBlock {
  constructor({ el, movies }) {
    this.el = el;
    this.movies = movies;
  }

  update(movies) {
    this.movies = movies;
    this.render();
  }

  render() {
    this.el.innerHTML = template({ movies: this.movies.map(({ id }) => id) });
    this.movieTiles = this.movies.map(movie => {
      const movieTile = new MovieTile({
        el: this.el.querySelector(`.movie-tile-${movie.id}`),
        movie
      });
      movieTile.render();

      return movieTile;
    });
  }
}

export default MoviesBlock;
