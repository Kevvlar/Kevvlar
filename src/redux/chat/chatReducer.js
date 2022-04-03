import {
  SET_IS_CHAT_NOTIFY_ON,
  SET_IS_CHAT_NOTIFY_OFF,
  SET_IS_OPEN,
  REMOVE_EVENT,
} from "./chatTypes";

const initialState = {
  isOpen: false,
  notify: false,
  innerNotify: false,
  events: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHAT_NOTIFY_ON:
      return {
        ...state,
        notify: true,
        innerNotify: true,
        events: [...state.events, action.payLoad],
      };

    case REMOVE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event !== action.payLoad),
      };

    case SET_IS_CHAT_NOTIFY_OFF:
      return {
        ...state,
        notify: false,
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
