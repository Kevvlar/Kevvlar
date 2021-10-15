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

const initialState = {
  boardId: "",
  boards: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payLoad],
      };
    case EDIT_BOARD:
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payLoad.id
            ? { ...board, title: action.payLoad.title }
            : board
        ),
        boardId: "",
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payLoad),
        boardId: "",
      };
    case SET_BOARD_ID:
      return {
        ...state,
        boardId: action.payLoad,
      };
    default:
      return state;
  }
};

export default boardReducer;
