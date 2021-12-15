import {
  CLOSE_MODAL,
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
} from "./modalTypes";

const initialState = {
  showModal: false,
  modalType: "",
  modalActionType: "",
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
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
