import React from "react";

import { BoardIcon, EditIcon, DeleteIcon } from "../../assets/svg/iconlibrary";

import "./boardItem.css";

const boardItem = ({ board }) => {
  return (
    <div className="board-item">
      <div className="title-container">
        <BoardIcon />
        <span className="board-item-title">{board.title}</span>
      </div>
      <div className="board-item-info-container">
        <p className="sub-color board-item-no-margin">7 Columns</p>
        <p className="sub-color board-item-no-margin">42 Cards</p>
      </div>
      <div className="board-item-footer">
        <div className="board-num-members sub-color">12 Members</div>
        <div className="board-item-icons">
          <EditIcon />
          <DeleteIcon />
        </div>
      </div>
    </div>
  );
};

export default boardItem;
