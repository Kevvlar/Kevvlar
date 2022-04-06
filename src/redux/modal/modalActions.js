import {
  CLOSE_MODAL,
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
  MEETING_MODAL,
  CHAT_MODAL,
  ADD,
} from "./modalTypes";

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

export const setBoardModal = (actionType = ADD) => {
  return {
    type: BOARD_MODAL,
    payLoad: actionType,
  };
};

export const setUserModal = (actionType = ADD) => {
  return {
    type: USER_MODAL,
    payLoad: actionType,
  };
};

export const setMeetingModal = (actionType = ADD) => {
  return {
    type: MEETING_MODAL,
    payLoad: actionType,
  };
};

export const setChatModal = (actionType = ADD) => {
  return {
    type: CHAT_MODAL,
    payLoad: actionType,
  };
};

export const setColumnModal = (actionType = ADD) => {
  return {
    type: COLUMN_MODAL,
    payLoad: actionType,
  };
};

export const setCardModal = (actionType = ADD) => {
  return {
    type: CARD_MODAL,
    payLoad: actionType,
  };
};
