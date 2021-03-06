import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { closeModal } from "../../redux/index";
import {
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
  USER_MODAL,
  ERROR_MODAL,
  EDIT,
  USERBOARDS_MODAL,
} from "../../redux/modal/modalTypes";

import BoardModal from "./board-modal/BoardModal";
import ColumnModal from "./column-modal/ColumnModal";
import CardModal from "./card-modal/CardModal";
import UserModal from "./user-modal/UserModal";
import ErrorModal from "./ErrorModal/ErrorModal";
import BoardUserMdal from "./BoardUsersModal/BoardUsersModal";

import "./modal.css";

const Modal = React.memo(
  ({ closeModal, modalType, currentBoardId, history, actionType }) => {
    switch (modalType) {
      case BOARD_MODAL:
        return (
          <div className="modal-wrapper">
            <div
              className="modal-close-overlay"
              onClick={() => {
                closeModal();
              }}
            ></div>
            <BoardModal />
          </div>
        );
      case CARD_MODAL:
        return (
          <div className="modal-wrapper">
            <div
              className="modal-close-overlay"
              onClick={() => {
                if (actionType === EDIT) {
                  history.push(`/boards/${currentBoardId}`);
                }
                closeModal();
              }}
            ></div>
            <CardModal />
          </div>
        );
      case COLUMN_MODAL:
        return (
          <div className="modal-wrapper">
            <div
              className="modal-close-overlay"
              onClick={() => {
                closeModal();
              }}
            ></div>
            <ColumnModal />
          </div>
        );
      case USER_MODAL:
        return (
          <div className="modal-wrapper">
            <div
              className="modal-close-overlay"
              onClick={() => {
                closeModal();
              }}
            ></div>
            <UserModal />
          </div>
        );
      case ERROR_MODAL:
        return (
          <div className="modal-wrapper">
            <div
              className="modal-close-overlay"
              onClick={() => {
                history.push(`/boards/${currentBoardId}`);
                closeModal();
              }}
            ></div>
            <ErrorModal />
          </div>
        );

      case USERBOARDS_MODAL:
        return (
          <div className="modal-wrapper">
            <div
              className="modal-close-overlay"
              onClick={() => {
                closeModal();
              }}
            ></div>
            <BoardUserMdal />
          </div>
        );

      default:
        return null;
    }
  }
);

const mapStateToProps = (state) => {
  return {
    modalType: state.modal.modalType,
    actionType: state.modal.modalActionType,
    currentBoardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modal));
