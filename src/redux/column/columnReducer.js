import {
  ADD_NEW_COLUMN_LOCAL,
  DELETE_COLUMNS_BY_BOARD_LOCAL,
  GET_COLUMNS_BY_BOARDS_LOCAL,
} from "./columnTypes";

const initialState = {
  currentColumnId: "",
  currentColumnTitle: "",
  error: "",
  columns: [],
  columnsByBoard: [],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COLUMN_LOCAL:
      return {
        ...state,
        columns: [...state.columns, action.payLoad],
      };

    case DELETE_COLUMNS_BY_BOARD_LOCAL:
      return {
        ...state,
        columns: state.columns.filter(
          (columnItem) => columnItem.boardId !== action.payLoad
        ),
        currentColumnId: "",
        currentColumnTitle: "",
        columnsByBoard: [],
      };

    case GET_COLUMNS_BY_BOARDS_LOCAL:
      return {
        ...state,
        columnsByBoard: state.columns.filter(
          (column) => column.boardId === action.payLoad
        ),
      };

    default:
      return state;
  }
};

export default columnReducer;
