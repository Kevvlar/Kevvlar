import {
  ADD_NEW_COLUMN_LOCAL,
  GET_COLUMNS_BY_BOARDS_LOCAL,
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

export const handleAddNewColumnLocal = (columnObj) => {
  return (dispatch) => {
    dispatch(addNewColumnLocal(columnObj));
    dispatch(addNewColumnToColumnOrderLocal(columnObj));
    dispatch(getColumnsByBoardLocal(columnObj.boardId));
    dispatch(getColumnOrderByBoardLocal(columnObj.boardId));
  };
};
