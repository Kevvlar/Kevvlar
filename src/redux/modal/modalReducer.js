import {
  CLOSE_MODAL,
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
  CHAT_MODAL,
  CONFERENCE_MODAL,
  TOGGLE_MINIMIZE,
  CLOSE_CONFERENCE_MODAL,
} from "./modalTypes";

const initialState = {
  showModal: false,
  modalType: "",
  modalActionType: "",
  conference: "",
  minimize: false,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFERENCE_MODAL:
      return {
        ...state,
        conference: CONFERENCE_MODAL,
      };

    case TOGGLE_MINIMIZE:
      return {
        ...state,
        minimize: !state.minimize,
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

    case CLOSE_CONFERENCE_MODAL:
      return {
        ...state,
        conference: "",
      };

    default:
      return state;
  }
};

export default modalReducer;
