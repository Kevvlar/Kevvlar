import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  closeModal,
  addNewBoardLocal,
  editCurrentBoardLocal,
  handleGlobalDeleteLocal,
} from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./boardModal.css";

const BoardModal = ({
  type,
  closeModal,
  addBoardLocal,
  boardTitle,
  boardId,
  editBoardLocal,
  deleteBoardLocal,
}) => {
  const AddBoard = () => {
    const [boardName, setBoardName] = useState("");
    return (
      <div className="modal-body">
        <h2 className="modal-title">Add New Board</h2>
        <input
          className="modal-board-text"
          type="text"
          name="boardName"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="New Board"
        />
        <button
          className="modal-board-button"
          onClick={() => {
            const baordId = uuidv4();
            const boardObj = {
              id: baordId,
              title: boardName,
              columnsOrder: [],
            };
            addBoardLocal(boardObj);
            setBoardName("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  };

  const EditBoard = () => {
    const [editBoardName, setEditBoardName] = useState(boardTitle);
    return (
      <div className="modal-body">
        <h2 className="modal-title">Edit Board</h2>
        <input
          className="modal-board-text"
          type="text"
          name="editBoardName"
          value={editBoardName}
          onChange={(e) => setEditBoardName(e.target.value)}
        />
        <button
          className="modal-board-button"
          onClick={() => {
            editBoardLocal({
              id: boardId,
              title: editBoardName,
            });
            setEditBoardName("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    );
  };

  const DeleteBoard = () => {
    return (
      <div className="modal-body">
        <h2 className="modal-title">Are You Sure?</h2>
        <span className="modal-sub-text">
          All information contained in this board will be delete
        </span>
        <div className="modal-button-container">
          <button
            className="delete-button"
            onClick={() => {
              deleteBoardLocal(boardId);
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
    );
  };

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        {type === ADD ? <AddBoard /> : null}
        {type === EDIT ? <EditBoard /> : null}
        {type === DELETE ? <DeleteBoard /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    boardTitle: state.board.selectBoard.title,
    boardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addBoardLocal: (boardObj) => dispatch(addNewBoardLocal(boardObj)),
    editBoardLocal: (boardObj) => dispatch(editCurrentBoardLocal(boardObj)),
    deleteBoardLocal: (boardId) => dispatch(handleGlobalDeleteLocal(boardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardModal);
