import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
} from "./cardTypes";

const initialState = {
  loading: false,
  error: "",
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
      };

    default:
      return state;
  }
};

export default cardReducer;
