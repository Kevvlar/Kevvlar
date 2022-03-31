import {
  SET_IS_CHAT_NOTIFY_ON,
  SET_IS_CHAT_NOTIFY_OFF,
  SET_IS_CHAT_NOTIFY_INNER_OFF,
  SET_IS_OPEN,
} from "./chatTypes";

const initialState = {
  isOpen: false,
  notify: false,
  innerNotify: false,
  event: {},
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHAT_NOTIFY_ON:
      return {
        ...state,
        notify: true,
        innerNotify: true,
        event: action.payLoad,
      };

    case SET_IS_CHAT_NOTIFY_OFF:
      return {
        ...state,
        notify: false,
        event: {},
      };

    case SET_IS_CHAT_NOTIFY_INNER_OFF:
      return {
        ...state,
        innerNotify: false,
        event: {},
      };

    case SET_IS_OPEN:
      return {
        ...state,
        isOpen: action.payLoad,
      };

    default:
      return state;
  }
};

export default chatReducer;
