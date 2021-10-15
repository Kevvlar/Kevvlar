import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../../redux/index";
import {
  BOARD_MODAL,
  COLUMN_MODAL,
  CARD_MODAL,
} from "../../redux/modal/modalTypes";

import BoardModal from "./board-modal/BoardModal";
import ColumnModal from "./column-modal/ColumnModal";
import CardModal from "./card-modal/CardModal";

import "./modal.css";

const Modal = ({ closeModal, modalType }) => {
  switch (modalType) {
    case BOARD_MODAL:
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={closeModal}></div>
          <BoardModal />
        </div>
      );
    case CARD_MODAL:
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={closeModal}></div>
          <CardModal />
        </div>
      );
    case COLUMN_MODAL:
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={closeModal}></div>
          <ColumnModal />
        </div>
      );
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return {
    modalType: state.modal.modalType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
