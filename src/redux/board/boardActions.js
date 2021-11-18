import { ADD_NEW_BOARD_LOCAL } from "./boardTypes";

export const addNewBoardLocal = (boardObj) => {
  return {
    type: ADD_NEW_BOARD_LOCAL,
    payLoad: boardObj,
  };
};
