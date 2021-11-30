import {
  ADD_NEW_BOARD_LOCAL,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  DELETE_BOARD_LOCAL,
  ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL,
  CHANGE_COLUMNS_ORDER_LOCAL,
  REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

import { deleteColumnsByBoardLocal } from "../index";

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

export const addColumnToColumnsOrderLocal = (columnId) => {
  return {
    type: ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL,
    payLoad: columnId,
  };
};

export const changeColumnsOrderLocal = (order) => {
  return {
    type: CHANGE_COLUMNS_ORDER_LOCAL,
    payLoad: order,
  };
};

export const removeColumnFromColumnsOrderLocal = (columnId) => {
  return {
    type: REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL,
    payLoad: columnId,
  };
};

export const handleGlobalDeleteLocal = (boardId) => {
  return (dispatch) => {
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
