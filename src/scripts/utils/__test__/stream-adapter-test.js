/* global describe, it, expect */

import { adjustStreams } from '../stream-adapter';

describe('stream adapter', () => {
  it('should throw if non-array passed', () => {
    expect(adjustStreams).to.throw();
  });

  it('should process array correctly', () => {
    const streams = [
      {
        type: 'mp4',
        url: 'url1'
      },
      {
        type: 'ogv',
        url: 'url2'
      }
    ];

    expect(adjustStreams(streams)).to.deep.equal([
      {
        type: 'video/mp4',
        src: 'url1'
      },
      {
        type: 'video/ogv',
        src: 'url2'
      }
    ]);
  });
});
