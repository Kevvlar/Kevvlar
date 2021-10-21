import {
  ADD_COLUMN_REQUEST,
  ADD_COLUMN_SUCCESS,
  ADD_COLUMN_FAILURE,
  FETCH_COLUMNS_REQUEST,
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILURE,
  SET_CURRENT_COLUMN_ID_AND_TITLE,
  DELETE_COLUMN_BY_BOARD,
} from "./columnTypes";

const initialState = {
  currentColumnId: "",
  currentColumnTitle: "",
  loading: false,
  error: "",
  columns: [],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLUMN_REQUEST:
      return {
        ...state,
        loading: true,
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case ADD_COLUMN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case ADD_COLUMN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case FETCH_COLUMNS_REQUEST:
      return {
        ...state,
        loading: true,
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case FETCH_COLUMNS_SUCCESS:
      return {
        ...state,
        loading: false,
        columns: action.payLoad,
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case FETCH_COLUMNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
        currentColumnId: "",
        currentColumnTitle: "",
      };

    case SET_CURRENT_COLUMN_ID_AND_TITLE:
      return {
        ...state,
        currentColumnId: action.payLoad.id,
        currentColumnTitle: action.payLoad.title,
      };

    case DELETE_COLUMN_BY_BOARD:
      return {
        ...state,
        currentColumnId: "",
        currentColumnTitle: "",
        loading: false,
        error: "",
        columns: [],
      };

    default:
      return state;
  }
};

export default columnReducer;
