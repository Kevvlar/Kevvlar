import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { closeModal } from "../../../redux";

import "./errorModal.css";

const ErrorModal = ({ errorMessage, closeModal, history, currentBoardId }) => {
  return (
    <div className="modal-error">
      <div className="close-icon-container">
        <FaTimes
          onClick={() => {
            history.push(`/boards/${currentBoardId}`);
            closeModal();
          }}
          className="close-icon"
        />
        <div className="modal-body">
          <h2 className="modal-title">An Error Occured!!</h2>
          <p>{errorMessage}</p>
          <button
            className="modal-error-button"
            onClick={() => {
              history.push(`/boards/${currentBoardId}`);
              closeModal();
            }}
          >
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
    currentBoardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorModal));
