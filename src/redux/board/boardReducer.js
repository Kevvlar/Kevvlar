import {
  ADD_NEW_BOARD_LOCAL,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  DELETE_BOARD_LOCAL,
  ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL,
  CHANGE_COLUMNS_ORDER_LOCAL,
  REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

const initialState = {
  selectBoardId: "",
  selectBoardTitle: "",
  selectColumnsOrder: [],
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
        selectColumnsOrder: action.payLoad.columnsOrder,
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
        selectColumnsOrder: [],
      };

    case ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL:
      return {
        ...state,
        selectColumnsOrder: [...state.selectColumnsOrder, action.payLoad],
        boards: state.boards.map((boardItem) =>
          boardItem.id === state.selectBoardId
            ? {
                ...boardItem,
                columnsOrder: [...boardItem.columnsOrder, action.payLoad],
              }
            : boardItem
        ),
      };

    case CHANGE_COLUMNS_ORDER_LOCAL:
      return {
        ...state,
        selectColumnsOrder: action.payLoad,
        boards: state.boards.map((boardItem) =>
          boardItem.id === state.selectBoardId
            ? {
                ...boardItem,
                columnsOrder: action.payLoad,
              }
            : boardItem
        ),
      };

    case REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL:
      return {
        ...state,
        selectColumnsOrder: state.selectColumnsOrder.filter(
          (id) => id !== action.payLoad
        ),
        boards: state.boards.map((boardItem) =>
          boardItem.id === state.selectBoardId
            ? {
                ...boardItem,
                columnsOrder: boardItem.columnsOrder.filter(
                  (id) => id !== action.payLoad
                ),
              }
            : boardItem
        ),
      };

    case DELETE_BOARD_LOCAL:
      return {
        ...state,
        boards: state.boards.filter((board) => board.id !== action.payLoad),
        selectBoardId: "",
        selectBoardTitle: "",
        selectColumnsOrder: [],
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
