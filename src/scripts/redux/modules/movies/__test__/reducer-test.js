/* global describe, it, expect */

import moviesReducer from '../reducer';

import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from '../constants';

describe('movies reducer', () => {
  it('should handle request', () => {
    const newState = moviesReducer({}, {
      type: FETCH_MOVIES_REQUEST
    });
    expect(newState.isFetching).to.equal(true);
  });

  it('should handle success event', () => {
    const newState = moviesReducer({}, {
      type: FETCH_MOVIES_SUCCESS,
      payload: [{ id: 1 }, { id: 3 }]
    });

    expect(newState.items.length).to.equal(2);
    expect(Math.abs(Date.now() - newState.lastUpdated)).to.be.below(5);
  });

  it('should handle error correctly', () => {
    const newState = moviesReducer({}, {
      type: FETCH_MOVIES_FAILURE,
      error: { type: 'my error' }
    });

    expect(newState.error).to.deep.equal({ type: 'my error' });
    expect(Math.abs(Date.now() - newState.lastUpdated)).to.be.below(5);
  });
});
