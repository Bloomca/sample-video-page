import { combineReducers } from 'redux';

import player from 'redux/modules/player/reducer';
import movies from 'redux/modules/movies/reducer';

export default combineReducers({
  player, movies
});
