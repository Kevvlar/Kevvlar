import {
  CLOSE_MODAL,
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
  CHAT_MODAL,
  ADD,
  CONFERENCE_MODAL,
  TOGGLE_MINIMIZE,
  CLOSE_CONFERENCE_MODAL,
  ERROR_MODAL,
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

export const setChatModal = (actionType = ADD) => {
  return {
    type: CHAT_MODAL,
    payLoad: actionType,
  };
};

export const setErrorModal = (message) => {
  return {
    type: ERROR_MODAL,
    payLoad: {
      actionType: ADD,
      message: message,
    },
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

export const setConferenceModal = () => {
  return {
    type: CONFERENCE_MODAL,
  };
};

export const toggleMinimize = () => {
  return {
    type: TOGGLE_MINIMIZE,
  };
};

export const closeConferenceModal = () => {
  return {
    type: CLOSE_CONFERENCE_MODAL,
  };
};
