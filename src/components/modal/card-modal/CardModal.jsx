import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AddCardModal from "./AddCardModal";
import EditCardModal from "./EditCardModal";

import { closeModal } from "../../../redux";
import { ADD, EDIT } from "../../../redux/modal/modalTypes";
import { FullscreenIcon } from "../../../assets/svg/iconlibrary";
import { useState } from "react";

import "./cardModal.css";

const CardModal = ({ closeModal, type, history, currentBoardId }) => {
  const [isActive, setActive] = useState(false);

  const fullscreenModal = () => {
    setActive(!isActive);
    if (!isActive) {
      document
        .getElementsByClassName("big-card-container")[0]
        .classList.add("fullscreen-modal-big-card");
      document
        .getElementsByClassName("input-description-container")[0]
        .classList.add("fullscreen-modal-big-card");
    } else {
      document
        .getElementsByClassName("big-card-container")[0]
        .classList.remove("fullscreen-modal-big-card");
      document
        .getElementsByClassName("input-description-container")[0]
        .classList.remove("fullscreen-modal-big-card");
    }
  };

  return (
    <div className={isActive ? "modal fullscreen-modal" : "modal"}>
      <div className="close-icon-container">
        <div
          className="fullscreen-icon-container fullscreen-icon"
          onClick={fullscreenModal}
        >
          <FullscreenIcon />
        </div>
        <FaTimes
          onClick={() => {
            history.push(`/boards/${currentBoardId}`);
            closeModal();
          }}
          className="close-icon"
        />
        {type === ADD ? <AddCardModal /> : null}
        {type === EDIT ? <EditCardModal /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
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
)(withRouter(CardModal));
