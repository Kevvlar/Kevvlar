import {
  SET_IS_CHAT_NOTIFY_ON,
  SET_IS_CHAT_NOTIFY_OFF,
  SET_IS_CHAT_NOTIFY_INNER_OFF,
  SET_IS_OPEN,
} from "./chatTypes";

export const setChatNotifyOn = (event) => {
  return {
    type: SET_IS_CHAT_NOTIFY_ON,
    payLoad: event,
  };
};

export const setChatNotifyOff = () => {
  return {
    type: SET_IS_CHAT_NOTIFY_OFF,
  };
};

export const setChatNotifyInnerOff = () => {
  return {
    type: SET_IS_CHAT_NOTIFY_INNER_OFF,
  };
};

export const setIsOpen = (bool) => {
  return {
    type: SET_IS_OPEN,
    payLoad: bool,
  };
};
