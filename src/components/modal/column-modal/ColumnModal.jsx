import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal } from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./columnModal.css";

const ColumnModal = ({ closeModal, type }) => {
  const AddColumn = () => {
    const [columnTitle, setColumnTitle] = useState("");
    return (
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
    const [columnEditTitle, setColumnEditTitle] = useState("");
    return (
      <div className="modal-board-body">
        <h2 className="modal-board-title">Edit Column</h2>
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
    <div className="modal-board-body">
      <h2 className="modal-board-title">Are You Sure?</h2>
      <span className="modal-sub-text">
        All information contained in this column will be delete
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

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
      </div>
      {type === ADD ? <AddColumn /> : null}
      {type === EDIT ? <EditColumn /> : null}
      {type === DELETE ? <DeleteColumn /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ColumnModal);
