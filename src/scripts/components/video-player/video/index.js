import React, { Component, PropTypes } from 'react';

/**
 * @module overview
 * videojs wrapper
 * it isn't needed to prevent updates from react
 * and to focus only on controlling player.
 * Right now there are no direct control from this component
 * except for chaning posters and streams
 *
 * Here we deal with player loaded through passed functions
 * It would be more appropriate to use store for this
 */

// style declaration
import './style.sass';

// utils declaration
import videojs from 'video.js';
import { isEqual } from 'lodash';
import { adjustStreams } from 'utils/stream-adapter';

export default class Video extends Component {
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
      this.player = videojs(this._playerEl, {
        controlBar: {
          children: [
            'playToggle',
            'progressControl',
            'currentTimeDisplay',
            'timeDivider',
            'durationDisplay',
            'volumeMenuButton'
          ]
        }
      }, () => {
        resolve();
      });

      // TODO add errors handling
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

  // never update markup, despite everything
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
