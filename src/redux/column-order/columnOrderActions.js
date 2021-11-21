import {
  ADD_NEW_COLUMN_ORDER_LOCAL,
  ADD_NEW_COLUMN_TO_COLUMN_ORDER_LOCAL,
  GET_COLUMN_ORDER_BY_BOARD_LOCAL,
} from "./columnOrderTypes";

export const addNewColumnOrderLocal = (orderObj) => {
  return {
    type: ADD_NEW_COLUMN_ORDER_LOCAL,
    payLoad: orderObj,
  };
};

export const addNewColumnToColumnOrderLocal = (columnObj) => {
  return {
    type: ADD_NEW_COLUMN_TO_COLUMN_ORDER_LOCAL,
    payLoad: columnObj,
  };
};

export const getColumnOrderByBoardLocal = (boardId) => {
  return {
    type: GET_COLUMN_ORDER_BY_BOARD_LOCAL,
    payLoad: boardId,
  };
};
