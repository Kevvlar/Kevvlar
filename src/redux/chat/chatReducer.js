import {
  SET_IS_CHAT_NOTIFY_ON,
  SET_IS_CHAT_NOTIFY_OFF,
  SET_IS_CHAT_NOTIFY_INNER_OFF,
} from "./chatTypes";

const initialState = {
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
      };

    case SET_IS_CHAT_NOTIFY_INNER_OFF:
      return {
        ...state,
        innerNotify: false,
        event: {},
      };

    default:
      return state;
  }
};

export default chatReducer;
