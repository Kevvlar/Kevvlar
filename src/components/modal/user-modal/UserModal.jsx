import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal } from "../../../redux";

import "./userModal.css";

const AddUserModal = ({ closeModal }) => {
  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        <div className="modal-body">
          <h2 className="modal-title">Add User To Board</h2>
          <span className="modal-sub-text">
            <input type="text" />
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
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
