import React from "react";
import { FaTimes } from "react-icons/fa";

import "./board-modal.styles.css";

const addBoard = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Add New Board</h2>
    <input className="modal-board-text" type="text" placeholder="New Board" />
    <button className="modal-board-button">Save</button>
  </div>
);

const editBoard = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Edit Board</h2>
    <input className="modal-board-text" type="text" placeholder="Edit Board" />
    <button className="modal-board-button">Save</button>
  </div>
);

const BoardModal = ({ hideModal, type }) => (
  <div className="modal-board">
    <div className="close-icon-container">
      <FaTimes onClick={hideModal} className="close-icon" />
    </div>
    {type === "add" ? addBoard() : null}
    {type === "edit" ? editBoard() : null}
  </div>
);

export default BoardModal;
