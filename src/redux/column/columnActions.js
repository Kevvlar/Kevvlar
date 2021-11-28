import {
  ADD_NEW_COLUMN_LOCAL,
  DELETE_COLUMNS_BY_BOARD_LOCAL,
  GET_COLUMNS_BY_BOARDS_LOCAL,
  SET_CURRENT_COLUMN_DATA,
  DELETE_COLUMN_LOCAL,
  EDIT_COLUMN_LOCAL,
  ADD_NEW_CARD_LOCAL,
  CHANGE_CARD_ORDER_LOCAL,
  SET_CURRENT_CARD_DATA,
  REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
  CHANGE_CARD_COLUMN_LOCAL,
} from "./columnTypes";

import {
  addColumnToColumnsOrderLocal,
  removeColumnFromColumnsOrderLocal,
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
    dispatch(addColumnToColumnsOrderLocal(columnObj.id));
    dispatch(addNewColumnLocal(columnObj));
    dispatch(getColumnsByBoardLocal(columnObj.boardId));
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

export const handleDeleteColumnLocal = (columnId) => {
  return (dispatch) => {
    dispatch(deleteColumnLocal(columnId));
    dispatch(removeColumnFromColumnsOrderLocal(columnId));
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

export const changeCardOrderLocal = (order) => {
  return {
    type: CHANGE_CARD_ORDER_LOCAL,
    payLoad: order,
  };
};

export const setCurrentCardData = (cardObj) => {
  return {
    type: SET_CURRENT_CARD_DATA,
    payLoad: cardObj,
  };
};

export const removeCardFromSourceColumnLocal = (sourceColumnId) => {
  return {
    type: REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
    payLoad: sourceColumnId,
  };
};

export const changeCardColumnLocal = (changeObj) => {
  return {
    type: CHANGE_CARD_COLUMN_LOCAL,
    payLoad: changeObj,
  };
};
