import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  closeModal,
  handleAddNewColumnLocal,
  createColumnServer,
  editColumnLocal,
  editColumnServer,
  handleDeleteColumnLocal,
  deleteColumnServer,
} from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./columnModal.css";

const ColumnModal = ({
  closeModal,
  user,
  type,
  boardId,
  currentColumnId,
  currentColumnTitle,
  addNewColumnLocal,
  addNewColumnServer,
  updateColumnLocal,
  updateColumnServer,
  removeColumnLocal,
  deleteCurrentColumnServer,
}) => {
  const AddColumn = () => {
    const [columnTitle, setColumnTitle] = useState("");
    return (
      <div className="modal-body">
        <h2 className="modal-title">Add New Column</h2>
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
            const columnObj = {
              id: uuidv4(),
              boardId: boardId,
              title: columnTitle,
              cards: [],
              cardsOrder: [],
            };
            addNewColumnLocal(columnObj);
            addNewColumnServer(user.token, boardId, columnObj);
            setColumnTitle("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  };

  const EditColumn = () => {
    const [columnEditTitle, setColumnEditTitle] = useState(currentColumnTitle);
    return (
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
            updateColumnLocal({
              id: currentColumnId,
              title: columnEditTitle,
            });
            updateColumnServer(user.token, boardId, currentColumnId, {
              title: columnEditTitle,
            });
            setColumnEditTitle("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  };

  const DeleteColumn = () => (
    <div className="modal-body">
      <h2 className="modal-title">Are You Sure?</h2>
      <span className="modal-sub-text">
        All information contained in this column will be delete
      </span>
      <div className="modal-button-container">
        <button
          className="delete-button"
          onClick={() => {
            removeColumnLocal(currentColumnId);
            deleteCurrentColumnServer(user.token, boardId, currentColumnId);
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
        {type === ADD ? <AddColumn /> : null}
        {type === EDIT ? <EditColumn /> : null}
        {type === DELETE ? <DeleteColumn /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    user: state.user.userData,
    boardId: state.board.selectBoard.id,
    currentColumnId: state.column.selectColumn.id,
    currentColumnTitle: state.column.selectColumn.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addNewColumnLocal: (columnObj) =>
      dispatch(handleAddNewColumnLocal(columnObj)),
    addNewColumnServer: (token, boardId, columnObj) =>
      dispatch(createColumnServer(token, boardId, columnObj)),
    updateColumnLocal: (columnObj) => dispatch(editColumnLocal(columnObj)),
    updateColumnServer: (token, boardId, columnId, columnObj) =>
      dispatch(editColumnServer(token, boardId, columnId, columnObj)),
    removeColumnLocal: (columnId) =>
      dispatch(handleDeleteColumnLocal(columnId)),
    deleteCurrentColumnServer: (token, boardId, columnId) =>
      dispatch(deleteColumnServer(token, boardId, columnId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnModal);
