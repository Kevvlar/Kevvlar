import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  ADD_NEW_BOARD_LOCAL,
  ADD_NEW_BOARD_SERVER,
  ADD_NEW_BOARD_SERVER_FAILURE,
  EDIT_BOARD_LOCAL,
  EDIT_BOARD_SERVER,
  EDIT_BOARD_SERVER_FAILURE,
  DELETE_BOARD_LOCAL,
  DELETE_BOARD_SERVER,
  DELTE_BOARD_SERVER_FAILURE,
  ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL,
  REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL,
  CHANGE_COLUMNS_ORDER_LOCAL,
  SET_CURRENT_BOARD_DATA,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

const initialState = {
  selectBoard: {},
  searchKey: "",
  error: "",
  boards: [],
  loading: false,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        boards: [],
      };

    case FETCH_BOARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: action.payLoad,
      };

    case FETCH_BOARDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

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

    case ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL:
      return {
        ...state,
        selectBoard: {
          ...state.selectBoard,
          columnsOrder: [...state.selectBoard.columnsOrder, action.payLoad],
        },
      };

    case REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL:
      return {
        ...state,
        selectBoard: {
          ...state.selectBoard,
          columnsOrder: state.selectBoard.columnsOrder.filter(
            (columnId) => columnId !== action.payLoad
          ),
        },
      };

    case CHANGE_COLUMNS_ORDER_LOCAL:
      return {
        ...state,
        selectBoard: {
          ...state.selectBoard,
          columnsOrder: action.payLoad,
        },
      };

    case SET_CURRENT_BOARD_DATA:
      return {
        ...state,
        selectBoard: action.payLoad,
        searchKey: "",
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
