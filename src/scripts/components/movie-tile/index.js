import React, { Component, PropTypes } from 'react';

// style declaration
import './style.sass';

export default class MovieTile extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    selectMovie: PropTypes.func.isRequired
  };

  selectMovie() {
    const { selectMovie, movie: { id } } = this.props;
    selectMovie(id);
  }

  render() {
    const { movie: { images, title, meta } } = this.props;

    return (
      <div className="movie-tile" onClick={this.selectMovie.bind(this)}>
        <div className="movie-tile--image-container">
          <img className="movie-tile--image" src={images.cover} alt={title} />
        </div>
        <h3 className="movie-tile--title">
          {title}
        </h3>
        <p className="movie-tile--year">
          {meta.releaseYear}
        </p>
      </div>
    );
  }
}
