import {
  ADD_COLUMN_REQUEST,
  ADD_COLUMN_SUCCESS,
  ADD_COLUMN_FAILURE,
  FETCH_COLUMNS_REQUEST,
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILURE,
  SET_CURRENT_COLUMN_ID_AND_TITLE,
  DELETE_COLUMN_BY_BOARD,
  UPDATE_CARD_ORDER_WITHIN_COLUMN_REQUEST,
  UPDATE_CARD_ORDER_WITHIN_COLUMN_SUCCESS,
  UPDATE_CARD_ORDER_WITHIN_COLUMN_FAILURE,
  UPDATE_CARD_ORDER_AND_COLUMN_REQUEST,
  UPDATE_CARD_ORDER_AND_COLUMN_SUCCESS,
  UPDATE_CARD_ORDER_AND_COLUMN_FAILURE,
  EMPTY_COLUMNS,
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

    case EMPTY_COLUMNS:
      return {
        ...state,
        columns: [],
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

    case UPDATE_CARD_ORDER_WITHIN_COLUMN_REQUEST:
      return {
        ...state,
        loading: true,
        columns: [],
      };

    case UPDATE_CARD_ORDER_WITHIN_COLUMN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_CARD_ORDER_WITHIN_COLUMN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

    case UPDATE_CARD_ORDER_AND_COLUMN_REQUEST:
      return {
        ...state,
        loading: true,
        columns: [],
      };

    case UPDATE_CARD_ORDER_AND_COLUMN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_CARD_ORDER_AND_COLUMN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

    default:
      return state;
  }
};

export default columnReducer;
