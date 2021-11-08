import React, { useReducer, createContext } from "react";
import { fromJS } from "immutable";

// context
export const CategoryDataContext = createContext({});

export const CHANGE_CATEGORY = "singers/CHANGE_CATEGORY";
export const CHANGE_ALPHA = "singers/CHANGE_ALPHA";
export const CHANGE_AREA = "singers/CHANGE_AREA";

// reducer 纯函数
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set("category", action.data);
    case CHANGE_ALPHA:
      return state.set("alpha", action.data);
    case CHANGE_AREA:
      return state.set("area", action.data);
    default:
      return;
  }
};

// Provider 组件
export const Data = (props) => {
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({
      category: "",
      alpha: "",
      area: "",
    })
  );
  return (
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryDataContext.Provider>
  );
};
