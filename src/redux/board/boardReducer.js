import {
  ADD_NEW_BOARD_LOCAL,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  DELETE_BOARD_LOCAL,
} from "./boardTypes";

const initialState = {
  selectBoardId: "",
  selectBoardTitle: "",
  error: "",
  boards: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_BOARD_LOCAL:
      return {
        ...state,
        boards: [...state.boards, action.payLoad],
      };

    case SET_CURRENT_BOARD_DATA:
      return {
        ...state,
        selectBoardId: action.payLoad.id,
        selectBoardTitle: action.payLoad.title,
      };

    case EDIT_BOARD_LOCAL:
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payLoad.id
            ? { ...board, title: action.payLoad.title }
            : board
        ),
        selectBoardId: "",
        selectBoardTitle: "",
      };

    case DELETE_BOARD_LOCAL:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payLoad),
        selectBoardId: "",
        selectBoardTitle: "",
      };

    default:
      return state;
  }
};

export default boardReducer;
