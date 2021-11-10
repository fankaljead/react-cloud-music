import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../application/Recommend/store";
import { reducer as singersReducer } from "../application/Singers/store";
import { reducer as rankReducer } from "../application/Rank/store";
import { reducer as albumReducer } from "../application/Album/store";
import { reducer as singerInfoReducer } from "../application/Singer/store";
import { reducer as PlayerReducer } from "../application/Player/store";
import { reducer as SearchReducer } from "../application/Search/store";

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer,
  player: PlayerReducer,
  search: SearchReducer,
});
