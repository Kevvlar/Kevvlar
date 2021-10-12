import React from "react";

import BoardModal from "./board-modal/board-modal";
import DeleteModal from "./delete-modal/delete-modal.component";
import ColumnModal from "./column-modal/column-modal.component";
import CardModal from "./card-modal/card-modal.component";

import "./modal.css";

const Modal = ({
  hideModal,
  actionType,
  showLeftSideNav,
  getBoardId,
  forceShowLeftSideNav,
}) => {
  switch (actionType) {
    case "CREATE_BOARD":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <BoardModal
            hideModal={hideModal}
            showLeftSideNav={showLeftSideNav}
            forceShowLeftSideNav={forceShowLeftSideNav}
            getBoardId={getBoardId}
            type="add"
          />
        </div>
      );
    case "EDIT_BOARD":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <BoardModal
            hideModal={hideModal}
            getBoardId={getBoardId}
            type="edit"
          />
        </div>
      );
    case "DELETE":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <DeleteModal hideModal={hideModal} />
        </div>
      );
    case "card":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <CardModal hideModal={hideModal} />
        </div>
      );
    case "CREATE_COLUMN":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <ColumnModal hideModal={hideModal} type="add" />
        </div>
      );
    case "EDIT_COLUMN":
      return (
        <div className="modal-wrapper">
          <div className="modal-close-overlay" onClick={hideModal}></div>
          <ColumnModal hideModal={hideModal} type="edit" />
        </div>
      );
    default:
      return null;
  }
};

export default Modal;
