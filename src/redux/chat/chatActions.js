import {
  SET_IS_CHAT_NOTIFY_ON,
  SET_IS_CHAT_NOTIFY_OFF,
  SET_ACTIVE_CHANNEL,
  SET_IS_OPEN,
  REMOVE_EVENT,
} from "./chatTypes";

export const setChatNotifyOn = (event) => {
  return {
    type: SET_IS_CHAT_NOTIFY_ON,
    payLoad: event,
  };
};

export const setActiveChannel = (channel) => {
  return {
    type: SET_ACTIVE_CHANNEL,
    payLoad: channel,
  };
};

export const removeEvent = (event) => {
  return {
    type: REMOVE_EVENT,
    payLoad: event,
  };
};

export const setChatNotifyOff = () => {
  return {
    type: SET_IS_CHAT_NOTIFY_OFF,
  };
};

export const setIsOpen = (bool) => {
  return {
    type: SET_IS_OPEN,
    payLoad: bool,
  };
};
