import { SELECT_MOVIE } from './constants';

export const selectMovie = (id) => {
  return {
    type: SELECT_MOVIE,
    payload: { movie: id }
  };
};
