import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  LOG_USER_OUT,
  TURN_OFF_NOTIFY,
  SET_NOTIFY_STATUS,
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
    case SET_NOTIFY_STATUS:
      return {
        ...state,
        userData: { ...state.userData, isNotified: action.payLoad },
      };
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

    case TURN_OFF_NOTIFY:
      return {
        ...state,
        userData: {
          ...state.userData,
          isNotified: action.payLoad,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
