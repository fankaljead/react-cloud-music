import * as actionType from "./constants";
import { fromJS } from "immutable";

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
});

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionType.CHANGE_BANNER:
      return state.set("bannerList", action.data);
    case actionType.CHANGE_RECOMMEND_LIST:
      return state.set("recommendList", action.data);
    case actionType.CHANGE_ENTER_LOADING:
      return state.set("enterLoading", action.data);
    default:
      return state;
  }
};

export default reducer;
