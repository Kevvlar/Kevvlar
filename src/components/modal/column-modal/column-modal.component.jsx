import React from "react";
import { FaTimes } from "react-icons/fa";

import "./column-modal.styles.css";

const addColumn = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Add New Column</h2>
    <input className="modal-board-text" type="text" placeholder="New Column" />
    <button className="modal-board-button">Save</button>
  </div>
);

const editColumn = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Edit Column</h2>
    <input className="modal-board-text" type="text" placeholder="Edit Column" />
    <button className="modal-board-button">Save</button>
  </div>
);

const BoardModal = ({ hideModal, type }) => (
  <div className="modal-board">
    <div className="close-icon-container">
      <FaTimes onClick={hideModal} className="close-icon" />
    </div>
    {type === "add" ? addColumn() : null}
    {type === "edit" ? editColumn() : null}
  </div>
);

export default BoardModal;
