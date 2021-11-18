import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { closeModal, addNewBoardLocal } from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./boardModal.css";

const BoardModal = ({ type, closeModal, addBoardLocal }) => {
  const AddBoard = () => {
    const [boardName, setBoardName] = useState("");
    return (
      <div className="modal-board-body">
        <h2 className="modal-board-title">Add New Board</h2>
        <input
          className="modal-board-text"
          type="text"
          name="boardName"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="New Board"
        />
        <button
          className="modal-board-button"
          onClick={() => {
            addBoardLocal({
              id: uuidv4(),
              title: boardName,
            });
            setBoardName("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  };

  const EditBoard = () => {
    const [editBoardName, setEditBoardName] = useState("");
    return (
      <div className="modal-board-body">
        <h2 className="modal-board-title">Edit Board</h2>
        <input
          className="modal-board-text"
          type="text"
          name="editBoardName"
          value={editBoardName}
          onChange={(e) => setEditBoardName(e.target.value)}
        />
        <button
          className="modal-board-button"
          onClick={() => {
            setEditBoardName("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  };

  const DeleteBoard = () => {
    return (
      <div className="modal-board-body">
        <h2 className="modal-board-title">Are You Sure?</h2>
        <span className="modal-sub-text">
          All information contained in this board will be delete
        </span>
        <div className="modal-button-container">
          <button
            className="delete-button"
            onClick={() => {
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
  };

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
      </div>
      {type === ADD ? <AddBoard /> : null}
      {type === EDIT ? <EditBoard /> : null}
      {type === DELETE ? <DeleteBoard /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addBoardLocal: (boardObj) => dispatch(addNewBoardLocal(boardObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardModal);
