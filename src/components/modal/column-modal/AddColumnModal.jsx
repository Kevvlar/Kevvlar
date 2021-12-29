import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  closeModal,
  handleAddNewColumnLocal,
  createColumnServer,
  handleSetIOAction,
} from "../../../redux";

const AddColumnModal = ({
  closeModal,
  user,
  boardId,
  addNewColumnLocal,
  addNewColumnServer,
  sendIOAction,
}) => {
  const [columnTitle, setColumnTitle] = useState("");

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes
          onClick={() => {
            closeModal();
          }}
          className="close-icon"
        />
        <div className="modal-body">
          <h2 className="modal-title">Add New Column</h2>
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
              const columnObj = {
                id: uuidv4(),
                boardId: boardId,
                title: columnTitle,
                cards: [],
                cardsOrder: [],
              };
              sendIOAction("ADD_NEW_COLUMN", columnObj);
              addNewColumnLocal(columnObj);
              addNewColumnServer(user.token, boardId, columnObj);
              setColumnTitle("");
              closeModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    boardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addNewColumnLocal: (columnObj) =>
      dispatch(handleAddNewColumnLocal(columnObj)),
    addNewColumnServer: (token, boardId, columnObj) =>
      dispatch(createColumnServer(token, boardId, columnObj)),
    sendIOAction: (state, data) => dispatch(handleSetIOAction(state, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddColumnModal);
