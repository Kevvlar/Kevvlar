import {
  ADD_NEW_BOARD_LOCAL,
  ADD_NEW_BOARD_SERVER,
  ADD_NEW_BOARD_SERVER_FAILURE,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  EDIT_BOARD_SERVER,
  EDIT_BOARD_SERVER_FAILURE,
  DELETE_BOARD_LOCAL,
  DELETE_BOARD_SERVER,
  DELTE_BOARD_SERVER_FAILURE,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

const initialState = {
  selectBoard: {},
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
    case ADD_NEW_BOARD_SERVER:
      return {
        ...state,
        error: "",
      };

    case ADD_NEW_BOARD_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case SET_CURRENT_BOARD_DATA:
      return {
        ...state,
        selectBoard: action.payLoad,
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
        selectBoard: {},
      };

    case EDIT_BOARD_SERVER:
      return {
        ...state,
        error: "",
      };

    case EDIT_BOARD_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case DELETE_BOARD_LOCAL:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payLoad),
        selectBoard: {},
      };

    case DELETE_BOARD_SERVER:
      return {
        ...state,
        error: "",
      };

    case DELTE_BOARD_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
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
