import {
  ADD_BOARD,
  ADD_COLUMN,
  ADD_CARD,
  EDIT_BOARD,
  EDIT_COLUMN,
  EDIT_CARD,
  DELETE_BOARD,
  DELTE_COLUMN,
  DELETE_CARD,
  SET_BOARD_ID,
  SET_COLUMN_ID,
  SET_CARD_ID,
} from "./boardTypes";

export const addBoard = (boardData) => {
  return {
    type: ADD_BOARD,
    payLoad: boardData,
  };
};

export const editBoard = (boardData) => {
  return {
    type: EDIT_BOARD,
    payLoad: boardData,
  };
};

export const deleteBoard = (boardData) => {
  return {
    type: DELETE_BOARD,
    payLoad: boardData,
  };
};

export const setBoardId = (id) => {
  return {
    type: SET_BOARD_ID,
    payLoad: id,
  };
};
