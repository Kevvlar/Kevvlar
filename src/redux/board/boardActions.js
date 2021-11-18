import {
  ADD_NEW_BOARD_LOCAL,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  DELETE_BOARD_LOCAL,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

export const addNewBoardLocal = (boardObj) => {
  return {
    type: ADD_NEW_BOARD_LOCAL,
    payLoad: boardObj,
  };
};

export const setCurrentBoardData = (board) => {
  return {
    type: SET_CURRENT_BOARD_DATA,
    payLoad: board,
  };
};

export const editCurrentBoardLocal = (boardObj) => {
  return {
    type: EDIT_BOARD_LOCAL,
    payLoad: boardObj,
  };
};

export const deleteCurrentBoardLocal = (boardId) => {
  return {
    type: DELETE_BOARD_LOCAL,
    payLoad: boardId,
  };
};

export const enterSearchText = (text) => {
  return {
    type: ENTER_SEARCH_TEXT,
    payLoad: text,
  };
};
