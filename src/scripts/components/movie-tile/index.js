import { template as createTemplate } from 'lodash';

import './style.sass';
import tmp from './template.html';

const template = createTemplate(tmp);

class MovieTile {
  constructor({ el, movie }) {
    this.el = el;
    this.markup = template(movie);
  }

  render() {
    this.el.innerHTML = this.markup;
  }
}

export default MovieTile;
