import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  LOG_USER_OUT,
  CLEAR_ERROR_MESSAGE,
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from "./userTypes";

const initialState = {
  userData: {},
  loading: false,
  notifications: [],
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

    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payLoad,
      };

    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

    case LOG_USER_OUT:
      return {
        ...state,
        userData: {},
        notifications: [],
        error: "",
      };

    case CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: "",
      };

    default:
      return state;
  }
};

export default userReducer;
