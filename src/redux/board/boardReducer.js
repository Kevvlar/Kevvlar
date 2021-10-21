import {
  FETCH_BOARD_REQUEST,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_FAILURE,
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  EDIT_BOARD_REQUEST,
  EDIT_BOARD_SUCCESS,
  EDIT_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  SET_CURRENT_BOARD_ID_AND_TITLE,
} from "./boardTypes";

const initialState = {
  currentBoardId: "",
  currentBoardTitle: "",
  loading: false,
  error: "",
  boards: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
        currentBoardId: "",
        currentBoardTitle: "",
      };

    case FETCH_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: action.payLoad,
        currentBoardId: "",
        currentBoardTitle: "",
      };

    case FETCH_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        boards: [],
        error: action.payLoad,
        currentBoardId: "",
        currentBoardTitle: "",
      };

    case SET_CURRENT_BOARD_ID_AND_TITLE:
      return {
        ...state,
        currentBoardId: action.payLoad.id,
        currentBoardTitle: action.payLoad.title,
      };

    case ADD_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
        currentBoardId: "",
        currentBoardTitle: "",
      };
    case ADD_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBoardId: "",
        currentBoardTitle: "",
      };

    case ADD_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        boards: [],
        currentBoardId: "",
        currentBoardTitle: "",
        error: action.payLoad,
      };

    case EDIT_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case EDIT_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBoardId: "",
        currentBoardTitle: "",
      };

    case EDIT_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        boards: [],
        currentBoardId: "",
        currentBoardTitle: "",
        error: action.payLoad,
      };

    case DELETE_BOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentBoardId: "",
        currentBoardTitle: "",
      };

    case DELETE_BOARD_FAILURE:
      return {
        ...state,
        loading: false,
        boards: [],
        currentBoardId: "",
        currentBoardTitle: "",
        error: action.payLoad,
      };

    default:
      return state;
  }
};

export default boardReducer;
