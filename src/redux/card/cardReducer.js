import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
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
