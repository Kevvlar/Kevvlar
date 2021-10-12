import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import "./boardItem.css";

const BoardItem = ({ board }) => (
  <div className="board-item-container">
    <div
      className="board-item-name"
      onClick={() => alert("Feature coming soon...")}
    >
      {board.title}
    </div>
    <div className="board-item-icons-cotainer">
      <FaEdit
        className="edit-board-icon"
        onClick={() => alert("Feature coming soon...")}
      />
      <FaTrash
        className="delete-board-icon"
        onClick={() => alert("Feature coming soon...")}
      />
    </div>
  </div>
);

export default BoardItem;
