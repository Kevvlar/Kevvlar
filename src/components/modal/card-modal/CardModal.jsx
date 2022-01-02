import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import AddCardModal from "./AddCardModal";
import EditCardModal from "./EditCardModal";

import { closeModal } from "../../../redux";
import { ADD, EDIT } from "../../../redux/modal/modalTypes";

import "./cardModal.css";

const CardModal = ({ closeModal, type }) => {
  return (
    <div className="modal">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        {type === ADD ? <AddCardModal /> : null}
        {type === EDIT ? <EditCardModal /> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
