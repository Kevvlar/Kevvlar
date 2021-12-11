import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import leftSideNavReducer from "./left-side-nav/leftSideNavReducer";
import rightSideNavReducer from "./right-side-nav/rightSideNavReducer";
import modalReducer from "./modal/modalReducer";
import boardReducer from "./board/boardReducer";
import columnReducer from "./column/columnReducer";
import userReducer from "./user/userReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  sideNavLeft: leftSideNavReducer,
  sideNavRight: rightSideNavReducer,
  modal: modalReducer,
  board: boardReducer,
  column: columnReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
