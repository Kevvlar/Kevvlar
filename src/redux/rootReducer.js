import { combineReducers } from "redux";
import leftSideNavReducer from "./left-side-nav/leftSideNavReducer";
import rightSideNavReducer from "./right-side-nav/rightSideNavReducer";
import modalReducer from "./modal/modalReducer";
import boardReducer from "./board/boardReducer";
import columnOrderReducer from "./column-order/columnOrderReducer";
import columnReducer from "./column/columnReducer";

const rootReducer = combineReducers({
  sideNavLeft: leftSideNavReducer,
  sideNavRight: rightSideNavReducer,
  modal: modalReducer,
  board: boardReducer,
  columnOrder: columnOrderReducer,
  column: columnReducer,
});

export default rootReducer;
