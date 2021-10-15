import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal } from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./boardModal.css";

const addBoard = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Add New Board</h2>
    <input
      className="modal-board-text"
      type="text"
      name="boardName"
      placeholder="New Board"
    />

    <button
      className="modal-board-button"
      onClick={() => console.log("Add board")}
    >
      Save
    </button>
  </div>
);

const editBoard = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Edit Board</h2>
    <input
      className="modal-board-text"
      type="text"
      name="editBoardName"
      placeholder="Edit Board"
    />
    <button
      className="modal-board-button"
      onClick={() => console.log("Edit board")}
    >
      Save
    </button>
  </div>
);

const deleteBoard = () => (
  <div className="modal-board">
    <div className="close-icon-container">
      <FaTimes className="close-icon" />
    </div>
    <div className="modal-board-body">
      <h2 className="delete-modal-title">Are You Sure?</h2>
      <span className="delete-modal-text">
        All information contained will be delete
      </span>
      <div className="modal-button-container">
        <button className="delete-button">Delete</button>
        <button className="modal-cancel-button">Cancel</button>
      </div>
    </div>
  </div>
);

const BoardModal = ({ type, closeModal }) => {
  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
      </div>
      {type === ADD ? addBoard() : null}
      {type === EDIT ? editBoard() : null}
      {type === DELETE ? deleteBoard() : null}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardModal);
