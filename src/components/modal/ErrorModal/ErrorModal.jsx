import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal } from "../../../redux";

import "./errorModal.css";

const ErrorModal = ({ errorMessage, closeModal }) => {
  return (
    <div className="modal-error">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        <div className="modal-body">
          <h2 className="modal-title">An Error Occured!!</h2>
          <p>{errorMessage}</p>
          <button className="modal-error-button" onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.modal.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
