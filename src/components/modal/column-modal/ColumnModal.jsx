import React from "react";
import { connect } from "react-redux";

import AddColumnModal from "./AddColumnModal";
import EditColumnModal from "./EditColumnModal";
import DeleteColumnModal from "./DeleteColumnModal";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./columnModal.css";

const ColumnModal = ({ type }) => {
  return (
    <>
      {type === ADD ? <AddColumnModal /> : null}
      {type === EDIT ? <EditColumnModal /> : null}
      {type === DELETE ? <DeleteColumnModal /> : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
  };
};

export default connect(mapStateToProps, null)(ColumnModal);
