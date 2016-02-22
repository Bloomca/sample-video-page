import React, { Component, PropTypes } from 'react';

// components declaration
import LoaderBlock from 'components/loader-block';
import Video from './video/index';

// style declaration
import './style.sass';

export default class VideoPlayer extends Component {
  static propTypes = {
    movie: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = { isLoading: !props.movie };
  }

  startLoading() {
    this.setState({ isLoading: true });
  }

  finishLoading() {
    this.setState({ isLoading: false });
  }

  renderMeta() {
    const { movie: { meta = {} } } = this.props;

    const releaseDate = meta.releaseYear
      ? (
        <div className="video-container--meta-section">
          <h5 className="video-container--meta-title">
            {'Release date'}
          </h5>
          <span className="video-container--meta-info">
            {meta.releaseYear}
          </span>
        </div>
      ) : null;

    const directors = meta.directors && meta.directors.length
      ? (
        <div className="video-container--meta-section">
          <h5 className="video-container--meta-title">
            {`Director${meta.directors.length > 1 ? 's' : ''}`}
          </h5>
            {meta.directors.map(({ name }) => {
              return (
                <div className="video-container--meta-info"
                  key={`director_${name}`}>
                  {name}
                </div>
              );
            })}
        </div>
      ) : null;

    const actors = meta.actors && meta.actors.length
      ? (
        <div className="video-container--meta-section">
          <h5 className="video-container--meta-title">
            {`Actor${meta.actors.length > 1 ? 's' : ''}`}
          </h5>
            {meta.actors.map(({ name }) => {
              return (
                <div className="video-container--meta-info"
                  key={`actor_${name}`}>
                  {name}
                </div>
              );
            })}
        </div>
      ) : null;

    return releaseDate || directors || actors
      ? (
        <div className="video-container--meta">
          {releaseDate}
          {directors}
          {actors}
        </div>
      ) : null;
  }

  renderInfo() {
    const { movie } = this.props;

    if (movie) {
      return (
        <div className="video-container--info">
          <div className="video-container--summary">
            <h2 className="video-container--title">
              {movie.title}
            </h2>
            <p className="video-container--description">
              {movie.description}
            </p>
          </div>
          {this.renderMeta()}
        </div>
      );
    }

    return null;
  }

  render() {
    const { movie } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <div className="video-container">
          {isLoading && <LoaderBlock />}
          <div style={{ display: isLoading ? 'none' : 'block' }}>
            <Video movie={movie}
              startLoading={this.startLoading.bind(this)}
              finishLoading={this.finishLoading.bind(this)} />
          </div>
        </div>
        {this.renderInfo()}
      </div>
    );
  }
}
