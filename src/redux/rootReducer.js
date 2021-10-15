import { combineReducers } from "redux";
import leftSideNavReducer from "./left-side-nav/leftSideNavReducer";
import rightSideNavReducer from "./right-side-nav/rightSideNavReducer";
import modalReducer from "./modal/modalReducer";

const rootReducer = combineReducers({
  sideNavLeft: leftSideNavReducer,
  sideNavRight: rightSideNavReducer,
  modal: modalReducer,
});

export default rootReducer;
