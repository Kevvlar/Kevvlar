import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { setBoardId } from "../../redux";

import { setBoardModal } from "../../redux/modal/modalActions";
import { EDIT, DELETE } from "../../redux/modal/modalTypes";

import "./boardItem.css";

const BoardItem = ({ board, editBoardModal, deleteBoardModal, setBoardId }) => (
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
        onClick={() => {
          setBoardId(board.id);
          editBoardModal();
        }}
      />
      <FaTrash
        className="delete-board-icon"
        onClick={() => {
          setBoardId(board.id);
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
    setBoardId: (data) => dispatch(setBoardId(data)),
  };
};

export default connect(null, mapDispatchToProps)(BoardItem);
