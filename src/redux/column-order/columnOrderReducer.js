import {
  FETCH_COLUMN_ORDER_REQUEST,
  FETCH_COLUMN_ORDER_SUCCESS,
  FETCH_COLUMN_ORDER_FAILURE,
  UPDATE_COLUMN_ORDER_REQUEST,
  UPDATE_COLUMN_ORDER_SUCCESS,
  UPDATE_COLUMN_ORDER_FAILURE,
  UPDATE_COLUMN_ORDER_LOCAL,
} from "./columnOrderTypes";

const initialState = {
  loading: false,
  error: "",
  order: [],
};

export const columnOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COLUMN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COLUMN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payLoad,
      };

    case FETCH_COLUMN_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        order: [],
        error: action.payLoad,
      };

    case UPDATE_COLUMN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_COLUMN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_COLUMN_ORDER_LOCAL: {
      return {
        ...state,
        order: action.payLoad,
      };
    }

    case UPDATE_COLUMN_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        order: [],
        error: action.payLoad,
      };

    default:
      return state;
  }
};

export default columnOrderReducer;
