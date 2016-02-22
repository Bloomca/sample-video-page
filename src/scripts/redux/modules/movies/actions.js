import { get } from 'utils/API';

import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from './constants';

export const loadMovies = () => {
  return (dispatch, getState) => {
    const { movies: { lastUpdated, isFetching } } = getState();

    // "should call api middleware"
    if (isFetching || lastUpdated) return;

    dispatch({
      type: FETCH_MOVIES_REQUEST
    });

    // additional timeout to imititate long waiting
    setTimeout(() => {
      get('/movies.json')
        .then(
          res => {
            dispatch({
              type: FETCH_MOVIES_SUCCESS,
              payload: res
            });
          },
          error => {
            dispatch({
              type: FETCH_MOVIES_FAILURE,
              error
            });
          }
        );
    }, 1000);
  };
};
