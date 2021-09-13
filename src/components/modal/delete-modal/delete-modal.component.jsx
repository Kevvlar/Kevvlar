import React from "react";
import { FaTimes } from "react-icons/fa";

import "./delete-modal.styles.css";

const DeleteModal = ({ hideModal }) => (
  <div className="modal-board">
    <div className="close-icon-container">
      <FaTimes onClick={hideModal} className="close-icon" />
    </div>
    <div className="modal-board-body">
      <h2 className="delete-modal-title">Are You Sure?</h2>
      <span className="delete-modal-text">
        All information contained will be delete
      </span>
      <div className="modal-button-container">
        <button className="delete-button">Delete</button>
        <button className="modal-cancel-button">Cancel</button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
