import {
  CLOSE_MODAL,
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
  CHAT_MODAL,
  ADD,
  SHOW_CONFERENCE_MODAL,
  MINIMIZE_CONFERENCE_MODAL,
  CLOSE_CONFERENCE_MODAL,
} from "./modalTypes";

export const showConferenceModal = () => {
  return {
    type: SHOW_CONFERENCE_MODAL,
  };
};

export const minimizeConferenceModal = () => {
  return {
    type: MINIMIZE_CONFERENCE_MODAL,
  };
};

export const closeConferenceModal = () => {
  return {
    type: CLOSE_CONFERENCE_MODAL,
  };
};

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
