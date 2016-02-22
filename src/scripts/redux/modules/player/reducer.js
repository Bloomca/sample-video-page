const initialState = {
  movie: null
};

import { SELECT_MOVIE } from './constants';
import { FETCH_MOVIES_SUCCESS } from '../movies/constants';

export default function player(state = initialState, action) {
  const { movie } = state;
  switch (action.type) {
    case SELECT_MOVIE:
      return Object.assign({}, state, {
        movie: action.payload.movie
      });
    case FETCH_MOVIES_SUCCESS:
      return movie || !action.payload[0].id ? state : Object.assign({}, state, {
        movie: action.payload[1].id
      });
    default:
      return state;
  }
}
