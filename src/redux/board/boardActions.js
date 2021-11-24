import {
  ADD_NEW_BOARD_LOCAL,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  DELETE_BOARD_LOCAL,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

import {
  addNewColumnOrderLocal,
  deleteColumnsByBoardLocal,
  deleteColumnOrderByBoardLocal,
} from "../index";

export const addNewBoardLocal = (boardObj) => {
  return {
    type: ADD_NEW_BOARD_LOCAL,
    payLoad: boardObj,
  };
};

export const handleAddNewBoardLocal = (boardObj, orderObj) => {
  return (dispatch) => {
    dispatch(addNewBoardLocal(boardObj));
    dispatch(addNewColumnOrderLocal(orderObj));
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

export const handleGlobalDeleteLocal = (boardId) => {
  return (dispatch) => {
    dispatch(deleteColumnOrderByBoardLocal(boardId));
    dispatch(deleteColumnsByBoardLocal(boardId));
    dispatch(deleteCurrentBoardLocal(boardId));
  };
};

export const enterSearchText = (text) => {
  return {
    type: ENTER_SEARCH_TEXT,
    payLoad: text,
  };
};
