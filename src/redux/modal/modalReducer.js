import {
  CLOSE_MODAL,
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
  CHAT_MODAL,
  SHOW_CONFERENCE_MODAL,
  MINIMIZE_CONFERENCE_MODAL,
  CLOSE_CONFERENCE_MODAL,
} from "./modalTypes";

const initialState = {
  showModal: false,
  modalType: "",
  modalActionType: "",
  conferenceState: "close",
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CONFERENCE_MODAL:
      return {
        ...state,
        conferenceState: "show",
      };

    case MINIMIZE_CONFERENCE_MODAL:
      return {
        ...state,
        conferenceState: "mini",
      };

    case CLOSE_CONFERENCE_MODAL:
      return {
        ...state,
        conferenceState: "close",
      };

    case BOARD_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: BOARD_MODAL,
        modalActionType: action.payLoad,
      };

    case COLUMN_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: COLUMN_MODAL,
        modalActionType: action.payLoad,
      };

    case CARD_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: CARD_MODAL,
        modalActionType: action.payLoad,
      };

    case USER_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: USER_MODAL,
        modalActionType: action.payLoad,
      };

    case CHAT_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: CHAT_MODAL,
        modalActionType: action.payLoad,
      };

    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        modalType: "",
        modalActionType: "",
      };
    default:
      return state;
  }
};

export default modalReducer;
