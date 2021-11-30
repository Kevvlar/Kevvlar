import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { setBoardModal } from "../../redux";

import { EDIT, DELETE } from "../../redux/modal/modalTypes";

import "./boardItem.css";

const BoardItem = ({ editBoardModal, deleteBoardModal }) => (
  <div className="board-item-container" onClick={() => {}}>
    <div className="board-item-name">{"board.title"}</div>

    <div className="board-item-icons-cotainer">
      <FaEdit
        className="edit-board-icon"
        onClick={() => {
          editBoardModal();
        }}
      />
      <FaTrash
        className="delete-board-icon"
        onClick={() => {
          deleteBoardModal();
        }}
      />
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    editBoardModal: () => dispatch(setBoardModal(EDIT)),
    deleteBoardModal: () => dispatch(setBoardModal(DELETE)),
  };
};

export default connect(null, mapDispatchToProps)(BoardItem);
