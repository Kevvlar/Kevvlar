import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import socket from "../../../Socket";

import { closeModal, editColumnLocal, editColumnServer } from "../../../redux";

const EditColumnModal = ({
  closeModal,
  user,
  boardId,
  currentColumnId,
  currentColumnTitle,
  updateColumnLocal,
  updateColumnServer,
}) => {
  const [columnEditTitle, setColumnEditTitle] = useState(currentColumnTitle);

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        <div className="modal-body">
          <h2 className="modal-title">Edit Column</h2>
          <input
            className="modal-board-text"
            type="text"
            placeholder="Edit Column"
            value={columnEditTitle}
            onChange={(e) => setColumnEditTitle(e.target.value)}
          />
          <button
            className="modal-board-button"
            onClick={() => {
              const columnObj = {
                id: currentColumnId,
                title: columnEditTitle,
              };
              updateColumnLocal(columnObj);
              updateColumnServer(user.token, boardId, currentColumnId, {
                title: columnEditTitle,
              });
              socket.emit("edit-column", columnObj);
              setColumnEditTitle("");
              closeModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    boardId: state.board.selectBoard.id,
    currentColumnId: state.column.selectColumn.id,
    currentColumnTitle: state.column.selectColumn.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    updateColumnLocal: (columnObj) => dispatch(editColumnLocal(columnObj)),
    updateColumnServer: (token, boardId, columnId, columnObj) =>
      dispatch(editColumnServer(token, boardId, columnId, columnObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditColumnModal);
