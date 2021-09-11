import React from "react";
import { FaTimes } from "react-icons/fa";

import { cardModal, boardModal, columnModal } from "./modal.components";

import "./modal.styles.css";

const Modal = ({ hideModal, actionType }) => {
  switch (actionType) {
    case "card":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          {cardModal(hideModal)}
        </div>
      );
    case "board":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <div className="close-icon-container">
            <FaTimes className="close-icon" onClick={hideModal} />
          </div>
          {boardModal(hideModal)}
        </div>
      );
    case "column":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <div className="close-icon-container">
            <FaTimes className="close-icon" onClick={hideModal} />
          </div>
          {columnModal(hideModal)}
        </div>
      );
    default:
      return null;
  }
};

export default Modal;
