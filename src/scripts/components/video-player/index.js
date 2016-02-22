import React, { Component, PropTypes } from 'react';

// components declaration
import LoaderBlock from 'components/loader-block';

// utils declaration
import videojs from 'video.js';
import { isEqual } from 'lodash';
import { adjustStreams } from 'utils/stream-adapter';

// style declaration
import './style.sass';

class Video extends Component {
  static propTypes = {
    movie: PropTypes.object,
    startLoading: PropTypes.func.isRequired,
    finishLoading: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.ready = new Promise((resolve) => {
      // mounting strategy from here
      // https://github.com/mattotodd/videojs-react/blob/4bbfd4f06bb0dc7c6034e95b269b03e2ce86378a/src/video.jsx#L149
      this._playerEl.removeAttribute('data-reactid');
      this.player = videojs(this._playerEl, {}, () => {
        resolve();
      });

      this.player.on('loadeddata', this.props.finishLoading);

      const { movie } = this.props;
      if (movie) this.setSource(movie);
    });
  }

  componentWillReceiveProps(props) {
    const { movie } = props;
    if (movie && !isEqual(movie, this.props.movie)) {
      this.setSource(movie);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.player) this.player.dispose();
  }

  setSource(movie) {
    this.player.src(adjustStreams(movie.streams));
    this.player.poster(movie.images.placeholder);
    this.props.startLoading();
  }

  render() {
    return (
      <video ref={node => { this._playerEl = node; }}
        id="video"
        className="video-js-tag video-js vjs-default-skin"
        controls preload="auto">
       <p className="vjs-no-js">
         To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
       </p>
      </video>
    );
  }
}

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
