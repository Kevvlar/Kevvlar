import { SET_IS_CHAT_NOTIFY_ON, SET_IS_CHAT_NOTIFY_OFF } from "./chatTypes";

export const setChatNotifyOn = () => {
  return {
    type: SET_IS_CHAT_NOTIFY_ON,
  };
};

export const setChatNotifyOff = () => {
  return {
    type: SET_IS_CHAT_NOTIFY_OFF,
  };
};
