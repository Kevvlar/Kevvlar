import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal } from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./columnModal.css";

const addColumn = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Add New Column</h2>
    <input className="modal-board-text" type="text" placeholder="New Column" />
    <button className="modal-board-button">Save</button>
  </div>
);

const editColumn = () => (
  <div className="modal-board-body">
    <h2 className="modal-board-title">Edit Column</h2>
    <input className="modal-board-text" type="text" placeholder="Edit Column" />
    <button className="modal-board-button">Save</button>
  </div>
);

const deleteColumn = () => (
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

const ColumnModal = ({ closeModal, type }) => (
  <div className="modal-board">
    <div className="close-icon-container">
      <FaTimes onClick={closeModal} className="close-icon" />
    </div>
    {type === ADD ? addColumn() : null}
    {type === EDIT ? editColumn() : null}
    {type === DELETE ? deleteColumn() : null}
  </div>
);

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
