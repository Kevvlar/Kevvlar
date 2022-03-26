import { SET_IS_CHAT_NOTIFY_ON, SET_IS_CHAT_NOTIFY_OFF } from "./chatTypes";

const initialState = {
  notify: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHAT_NOTIFY_ON:
      return {
        ...state,
        notify: true,
      };

    case SET_IS_CHAT_NOTIFY_OFF:
      return {
        ...state,
        notify: false,
      };

    default:
      return state;
  }
};

export default chatReducer;
