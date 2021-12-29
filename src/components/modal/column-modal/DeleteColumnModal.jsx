import { connect } from "react-redux";
import { FaTimes } from "react-icons/fa";

import {
  closeModal,
  handleDeleteColumnLocal,
  deleteColumnServer,
  handleSetIOAction,
} from "../../../redux";

const DeleteColumnModal = ({
  closeModal,
  user,
  boardId,
  currentColumnId,
  removeColumnLocal,
  deleteCurrentColumnServer,
  sendIOAction,
}) => {
  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        <div className="modal-body">
          <h2 className="modal-title">Are You Sure?</h2>
          <span className="modal-sub-text">
            All information contained in this column will be delete
          </span>
          <div className="modal-button-container">
            <button
              className="delete-button"
              onClick={() => {
                removeColumnLocal(currentColumnId);
                sendIOAction("DELETE_COLUMN", currentColumnId);
                deleteCurrentColumnServer(user.token, boardId, currentColumnId);
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
    user: state.user.userData,
    boardId: state.board.selectBoard.id,
    currentColumnId: state.column.selectColumn.id,
    currentColumnTitle: state.column.selectColumn.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    removeColumnLocal: (columnId) =>
      dispatch(handleDeleteColumnLocal(columnId)),
    deleteCurrentColumnServer: (token, boardId, columnId) =>
      dispatch(deleteColumnServer(token, boardId, columnId)),
    sendIOAction: (state, data) => dispatch(handleSetIOAction(state, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteColumnModal);
