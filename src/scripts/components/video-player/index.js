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

  renderInfo() {
    const { movie } = this.props;

    if (movie) {
      return (
        <div>
          <h2>
            {movie.title}
          </h2>
          <h4>
            {movie.description}
          </h4>
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
        <div className="video-js-container">
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
