import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import "./board-item.styles.css";

const BoardItem = ({
  board,
  showModal,
  editBoardActionType,
  deleteModalActionType,
}) => (
  <div className="board-item-container">
    <div className="board-item-name">{board.name}</div>
    <div className="board-item-icons-cotainer">
      <FaEdit
        onClick={() => {
          editBoardActionType();
          showModal();
        }}
      />
      <FaTrash
        onClick={() => {
          deleteModalActionType();
          showModal();
        }}
      />
    </div>
  </div>
);

export default BoardItem;
