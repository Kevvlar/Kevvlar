import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  LOG_USER_OUT,
} from "./userTypes";

const initialState = {
  userData: {},
  loading: false,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SIGN_UP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payLoad,
      };

    case SIGN_UP_USER_FAILURE:
      return {
        ...state,
        loading: false,
        userData: {},
        error: action.payLoad,
      };

    case SIGN_IN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SIGN_IN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payLoad,
      };

    case SIGN_IN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        userData: {},
        error: action.payLoad,
      };

    case LOG_USER_OUT:
      return {
        ...state,
        userData: {},
        error: "",
      };

    default:
      return state;
  }
};

export default userReducer;
