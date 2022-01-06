import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  closeModal,
  addNewBoardLocal,
  createNewBoardServer,
  editCurrentBoardLocal,
  editBoardServer,
  handleDeleteBoardLocal,
  handleDeleteBoardServer,
} from "../../../redux";
import { ADD, EDIT, DELETE } from "../../../redux/modal/modalTypes";

import "./boardModal.css";

const BoardModal = ({
  type,
  closeModal,
  addBoardLocal,
  addBoardServer,
  boardTitle,
  boardId,
  editBoardLocal,
  updateBoardServer,
  deleteBoardLocal,
  deleteBoardServer,
  user,
}) => {
  const AddBoard = () => {
    const [boardName, setBoardName] = useState("");

    const handleSubmit = () => {
      const boardId = uuidv4();
      const boardObj = {
        id: boardId,
        title: boardName,
        numberOfColumns: 0,
        numberOfCards: 0,
        columnsOrder: [],
        admins: [user],
        members: [],
      };
      addBoardLocal(boardObj);
      addBoardServer(boardObj, user.token);
      setBoardName("");
      closeModal();
    };

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="modal-body"
      >
        <h2 className="modal-title">Add New Board</h2>
        <input
          className="modal-board-text"
          type="text"
          name="boardName"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="New Board"
        />
        <button className="modal-board-button" type="submit">
          Save
        </button>
      </form>
    );
  };

  const EditBoard = () => {
    const [editBoardName, setEditBoardName] = useState(boardTitle);

    const handleSubmit = () => {
      editBoardLocal({
        id: boardId,
        title: editBoardName,
      });
      updateBoardServer(boardId, { title: editBoardName }, user.token);
      setEditBoardName("");
      closeModal();
    };
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="modal-body"
      >
        <h2 className="modal-title">Edit Board</h2>
        <input
          className="modal-board-text"
          type="text"
          name="editBoardName"
          value={editBoardName}
          onChange={(e) => setEditBoardName(e.target.value)}
        />
        <button className="modal-board-button" type="submit">
          Save
        </button>
      </form>
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
              deleteBoardServer(boardId, user.token);
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
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addBoardLocal: (boardObj) => dispatch(addNewBoardLocal(boardObj)),
    addBoardServer: (boardObj, token) =>
      dispatch(createNewBoardServer(boardObj, token)),
    editBoardLocal: (boardObj) => dispatch(editCurrentBoardLocal(boardObj)),
    updateBoardServer: (boardId, boardObj, token) =>
      dispatch(editBoardServer(boardId, boardObj, token)),
    deleteBoardLocal: (boardId) => dispatch(handleDeleteBoardLocal(boardId)),
    deleteBoardServer: (boardId, token) =>
      dispatch(handleDeleteBoardServer(boardId, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardModal);
