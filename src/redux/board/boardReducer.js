import {
  ADD_NEW_BOARD_LOCAL,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  DELETE_BOARD_LOCAL,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

const initialState = {
  selectBoardId: "",
  selectBoardTitle: "",
  searchKey: "",
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
        searchKey: "",
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

    case ENTER_SEARCH_TEXT:
      return {
        ...state,
        searchKey: action.payLoad.toLowerCase(),
      };

    default:
      return state;
  }
};

export default boardReducer;
