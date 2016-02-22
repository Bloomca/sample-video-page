import React, { Component, PropTypes } from 'react';

// components declaration
import MovieTile from 'components/movie-tile';

// style declaration
import './style.sass';

export default class MoviesBlock extends Component {
  static propTypes = {
    movies: PropTypes.array,
    selectMovie: PropTypes.func.isRequired
  }

  render() {
    const { movies, selectMovie } = this.props;

    return (
      <div>
        {movies.map(movie => {
          const key = `movie_block_${movie.id}`;
          return (
            <div className="movie-tile-container" key={key}>
              <MovieTile movie={movie} selectMovie={selectMovie} />;
            </div>
          );
        })}
      </div>
    );
  }
}
