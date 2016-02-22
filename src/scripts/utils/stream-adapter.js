import { isArray } from 'lodash';

/**
 * @description adjust stream format from API
 * to the accepted by video.js
 *
 * @param {array} streams – array of streams from the server
 * @return {array} – processed streams
 */
export const adjustStreams = streams => {
  if (!isArray(streams)) {
    throw new Error('only arrays are supported');
  }

  return streams.map(({ type, url }) => {
    return {
      type: `video/${type}`,
      src: url
    };
  });
};
