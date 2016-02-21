import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE
} from './constants';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  items: [],
  error: null
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        error: null
      });
    case FETCH_MOVIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload,
        lastUpdated: Date.now()
      });
    case FETCH_MOVIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: Date.now(),
        error: action.error
      });
    default:
      return state;
  }
}
