import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  EDIT_CARD_REQUEST,
  EDIT_CARD_SUCCESS,
  EDIT_CARD_FAILURE,
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  SET_CARD_DATA,
} from "./cardTypes";

const initialState = {
  loading: false,
  error: "",
  currentCardId: "",
  title: "",
  description: "",
  date: "",
  color: "",
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ADD_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
        currentCardId: "",
        title: "",
        description: "",
        date: "",
        color: "",
      };

    case EDIT_CARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        currentCardId: "",
        title: "",
        description: "",
        date: "",
        color: "",
      };

    case EDIT_CARD_SUCCESS:
      return {
        loading: false,
        error: "",
        currentCardId: "",
        title: "",
        description: "",
        date: "",
        color: "",
      };

    case EDIT_CARD_FAILURE:
      return {
        loading: false,
        error: action.payLoad,
        currentCardId: "",
        title: "",
        description: "",
        date: "",
        color: "",
      };

    case DELETE_CARD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        currentCardId: "",
        title: "",
        description: "",
        date: "",
        color: "",
      };

    case DELETE_CARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
        currentCardId: "",
        title: "",
        description: "",
        date: "",
        color: "",
      };

    case SET_CARD_DATA:
      return {
        ...state,
        currentCardId: action.payLoad.id,
        title: action.payLoad.title,
        description: action.payLoad.description,
        date: action.payLoad.date,
        color: action.payLoad.color,
      };

    default:
      return state;
  }
};

export default cardReducer;
