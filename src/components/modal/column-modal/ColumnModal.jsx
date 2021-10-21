import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal, addColumn, deleteColumn } from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./columnModal.css";

const ColumnModal = ({
  closeModal,
  type,
  columnId,
  boardId,
  createColumn,
  deleteCurrentColumn,
}) => {
  const [columnTitle, setColumnTitle] = useState("");

  const addColumn = () => (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Add New Column</h2>
      <input
        className="modal-board-text"
        type="text"
        placeholder="New Column"
        value={columnTitle}
        onChange={(e) => setColumnTitle(e.target.value)}
      />

      <button
        className="modal-board-button"
        onClick={() => {
          createColumn(
            {
              title: columnTitle,
              board: boardId,
            },
            boardId
          );
          setColumnTitle("");
          closeModal();
        }}
      >
        Save
      </button>
    </div>
  );

  const editColumn = () => (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Edit Column</h2>
      <input
        className="modal-board-text"
        type="text"
        placeholder="Edit Column"
      />
      <button className="modal-board-button">Save</button>
    </div>
  );

  const deleteColumn = () => (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Are You Sure?</h2>
      <span className="modal-sub-text">
        All information contained in this column will be delete
      </span>
      <div className="modal-button-container">
        <button
          className="delete-button"
          onClick={() => {
            deleteCurrentColumn(columnId, boardId);
            closeModal();
          }}
        >
          Delete
        </button>
        <button className="modal-cancel-button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
      </div>
      {type === ADD ? addColumn() : null}
      {type === EDIT ? editColumn() : null}
      {type === DELETE ? deleteColumn() : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    boardId: state.board.currentBoardId,
    columnId: state.column.currentColumnId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createColumn: (data, id) => dispatch(addColumn(data, id)),
    deleteCurrentColumn: (columnId, boardId) =>
      dispatch(deleteColumn(columnId, boardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnModal);
