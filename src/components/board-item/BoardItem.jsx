import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import {
  setBoardModal,
  setCurrentBoardIdAndTitle,
  fetchColumnOrder,
  fetchColumns,
} from "../../redux";

import { EDIT, DELETE } from "../../redux/modal/modalTypes";

import "./boardItem.css";

const BoardItem = ({
  board,
  editBoardModal,
  deleteBoardModal,
  setBoardIdAndTitle,
  fetchColumnOrder,
  fetchColumns,
}) => (
  <div
    className="board-item-container"
    onClick={() => {
      setBoardIdAndTitle({
        id: board._id,
        title: board.title,
      });
      fetchColumns(board._id);
      fetchColumnOrder(board._id);
    }}
  >
    <div className="board-item-name">{board.title}</div>

    <div className="board-item-icons-cotainer">
      <FaEdit
        className="edit-board-icon"
        onClick={() => {
          setBoardIdAndTitle({
            id: board._id,
            title: board.title,
          });
          editBoardModal();
        }}
      />
      <FaTrash
        className="delete-board-icon"
        onClick={() => {
          setBoardIdAndTitle({
            id: board._id,
            title: board.title,
          });
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
    setBoardIdAndTitle: (data) => dispatch(setCurrentBoardIdAndTitle(data)),
    fetchColumnOrder: (data) => dispatch(fetchColumnOrder(data)),
    fetchColumns: (data) => dispatch(fetchColumns(data)),
  };
};

export default connect(null, mapDispatchToProps)(BoardItem);
