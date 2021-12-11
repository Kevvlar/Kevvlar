import {
  ADD_NEW_COLUMN_LOCAL,
  ADD_NEW_COLUMN_SERVER_FAILURE,
  DELETE_COLUMNS_BY_BOARD_LOCAL,
  SET_CURRENT_COLUMN_DATA,
  DELETE_COLUMN_LOCAL,
  EDIT_COLUMN_LOCAL,
  ADD_NEW_CARD_LOCAL,
  DELETE_CARD_LOCAL,
  EDIT_CARD_LOCAL,
  CHANGE_CARD_ORDER_LOCAL,
  SET_CURRENT_CARD_DATA,
  REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
  CHANGE_CARD_COLUMN_ID,
  CHANGE_CARD_COLUMN_LOCAL,
  ENTER_CARD_SEARCH_KEY,
} from "./columnTypes";

export const addNewColumnLocal = (columnObj) => {
  return {
    type: ADD_NEW_COLUMN_LOCAL,
    payLoad: columnObj,
  };
};

export const addNewColumnServerFailure = (error) => {
  return {
    type: ADD_NEW_COLUMN_SERVER_FAILURE,
    payLoad: error,
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

export const editCardLocal = (cardObj) => {
  return {
    type: EDIT_CARD_LOCAL,
    payLoad: cardObj,
  };
};

export const deleteCardLocal = (deleteObj) => {
  return {
    type: DELETE_CARD_LOCAL,
    payLoad: deleteObj,
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

export const changeCardColumnId = (columnId) => {
  return {
    type: CHANGE_CARD_COLUMN_ID,
    payLoad: columnId,
  };
};

export const handleChangeCardColumnLocal = (sourceColumnId, changeObj) => {
  return (dispatch) => {
    dispatch(removeCardFromSourceColumnLocal(sourceColumnId));
    dispatch(changeCardColumnId(changeObj.destinationColumn));
    dispatch(changeCardColumnLocal(changeObj));
  };
};

export const enterCardSearchKey = (keyWord) => {
  return {
    type: ENTER_CARD_SEARCH_KEY,
    payLoad: keyWord,
  };
};
