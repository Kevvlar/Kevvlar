import React from "react";

import { cardModal, boardModal, columnModal } from "./modal.components";

import "./modal.styles.css";

const Modal = ({ hideModal, actionType }) => {
  switch (actionType) {
    case "card":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          {cardModal()}
        </div>
      );
    case "board":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          {boardModal()}
        </div>
      );
    case "column":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          {columnModal()}
        </div>
      );
    default:
      return null;
  }
};

export default Modal;
