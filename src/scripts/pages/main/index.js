import React, { Component, PropTypes } from 'react';

// redux declaration
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { loadMovies } from 'redux/modules/movies/actions';
import { selectMovie } from 'redux/modules/player/actions';

// components declaration
import MoviesBlock from 'components/movies-block';
import VideoPlayer from 'components/video-player';

class MainPage extends Component {
  static propTypes = {
    movies: PropTypes.shape({
      isFetching: PropTypes.bool.isRequired,
      lastUpdated: PropTypes.number,
      items: PropTypes.array.isRequired
    }).isRequired,
    player: PropTypes.object.isRequired,
    loadMovies: PropTypes.func.isRequired,
    selectMovie: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadMovies();
  }

  selectMovieToPlay(id) {
    this.props.selectMovie(id);
  }

  render() {
    const { movies: { isFetching, items }, player: { movie } } = this.props;

    const movieForVideo = !movie
      ? null
      : items.find(({ id }) => id === movie);

    return (
      <div>
        <h1>
          {'Video page'}
        </h1>
        <VideoPlayer movie={movieForVideo} />
        <MoviesBlock movies={items} selectMovie={this.selectMovieToPlay.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  movies: state => state.movies,
  player: state => state.player
});

const mapDispatchToProps = {
  loadMovies, selectMovie
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
