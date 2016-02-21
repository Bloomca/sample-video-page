import { get } from 'utils/API';

import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from './constants';

export const loadMovies = () => {
  return (dispatch, getState) => {
    dispatch({
      type: FETCH_MOVIES_REQUEST
    });

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
  };
};
