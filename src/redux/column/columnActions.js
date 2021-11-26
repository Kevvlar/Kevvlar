import {
  ADD_NEW_COLUMN_LOCAL,
  DELETE_COLUMNS_BY_BOARD_LOCAL,
  GET_COLUMNS_BY_BOARDS_LOCAL,
  SET_CURRENT_COLUMN_DATA,
  DELETE_COLUMN_LOCAL,
  EDIT_COLUMN_LOCAL,
  ADD_NEW_CARD_LOCAL,
} from "./columnTypes";

import {
  addNewColumnToColumnOrderLocal,
  getColumnOrderByBoardLocal,
} from "../index";

export const addNewColumnLocal = (columnObj) => {
  return {
    type: ADD_NEW_COLUMN_LOCAL,
    payLoad: columnObj,
  };
};

export const getColumnsByBoardLocal = (boardId) => {
  return {
    type: GET_COLUMNS_BY_BOARDS_LOCAL,
    payLoad: boardId,
  };
};

export const deleteColumnsByBoardLocal = (boardId) => {
  return {
    type: DELETE_COLUMNS_BY_BOARD_LOCAL,
    payLoad: boardId,
  };
};

export const handleAddNewColumnLocal = (columnObj) => {
  return (dispatch) => {
    dispatch(addNewColumnLocal(columnObj));
    dispatch(addNewColumnToColumnOrderLocal(columnObj));
    dispatch(getColumnsByBoardLocal(columnObj.boardId));
    dispatch(getColumnOrderByBoardLocal(columnObj.boardId));
  };
};

export const setCurrentColumnData = (columnObj) => {
  return {
    type: SET_CURRENT_COLUMN_DATA,
    payLoad: columnObj,
  };
};

export const deleteColumnLocal = (columnId) => {
  return {
    type: DELETE_COLUMN_LOCAL,
    payLoad: columnId,
  };
};

export const editColumnLocal = (columnObj) => {
  return {
    type: EDIT_COLUMN_LOCAL,
    payLoad: columnObj,
  };
};

export const addNewCardLocal = (cardObj) => {
  return {
    type: ADD_NEW_CARD_LOCAL,
    payLoad: cardObj,
  };
};
