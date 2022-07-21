import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import leftSideNavReducer from "./left-side-nav/leftSideNavReducer";
import rightSideNavReducer from "./right-side-nav/rightSideNavReducer";
import activityReducer from "./activity/activityReducer";
import fileReducer from "./file/fileReducer";
import modalReducer from "./modal/modalReducer";
import boardReducer from "./board/boardReducer";
import columnReducer from "./column/columnReducer";
import userReducer from "./user/userReducer";
import chatReducer from "./chat/chatReducer";
import calendarReducer from "./calendar/calendarReducer";

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
  activity: activityReducer,
  file: fileReducer,
  chat: chatReducer,
  calendar: calendarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
