import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addBoard, closeModal, deleteBoard, editBoard } from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./boardModal.css";

const AddBoard = ({ closeModal, addBoardItem }) => {
  const [boardName, setBoardName] = useState("");
  return (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Add New Board</h2>
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
          const id = uuidv4();
          const title = boardName;

          addBoardItem({ id, title });
          setBoardName("");
          closeModal();
        }}
      >
        Save
      </button>
    </div>
  );
};

const EditBoard = ({ boardId, closeModal, editBoardItem }) => {
  const [editBoardName, setEditBoardName] = useState("");
  return (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Edit Board</h2>
      <input
        className="modal-board-text"
        type="text"
        name="editBoardName"
        placeholder="Edit Board"
        onChange={(e) => setEditBoardName(e.target.value)}
      />
      <button
        className="modal-board-button"
        onClick={() => {
          const title = editBoardName;

          editBoardItem({ id: boardId, title });
          setEditBoardName("");
          closeModal();
        }}
      >
        Save
      </button>
    </div>
  );
};

const DeleteBoard = ({ deleteBoardItem, closeModal, boardId }) => {
  return (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Are You Sure?</h2>
      <span className="modal-sub-text">
        All information contained in this board will be delete
      </span>
      <div className="modal-button-container">
        <button
          className="delete-button"
          onClick={() => {
            deleteBoardItem(boardId);
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

const BoardModal = ({
  type,
  closeModal,
  addBoardItem,
  editBoardItem,
  deleteBoardItem,
  boardId,
}) => {
  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
      </div>
      {type === ADD ? (
        <AddBoard closeModal={closeModal} addBoardItem={addBoardItem} />
      ) : null}
      {type === EDIT ? (
        <EditBoard
          boardId={boardId}
          closeModal={closeModal}
          editBoardItem={editBoardItem}
        />
      ) : null}
      {type === DELETE ? (
        <DeleteBoard
          closeModal={closeModal}
          deleteBoardItem={deleteBoardItem}
          boardId={boardId}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    boardId: state.board.boardId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addBoardItem: (data) => dispatch(addBoard(data)),
    deleteBoardItem: (data) => dispatch(deleteBoard(data)),
    editBoardItem: (data) => dispatch(editBoard(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardModal);
