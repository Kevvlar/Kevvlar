import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import socket from "../../../Socket";

import {
  closeModal,
  addMemberToBoard,
  getUserEmail,
  removeMemberFromBoard,
} from "../../../redux";

import "./userModal.css";

const UserModal = ({
  closeModal,
  type,
  addMember,
  user,
  currrentBoardId,
  setUserEmail,
  userToRemoveEmail,
  removeMember,
}) => {
  const AddUserModal = () => {
    const [userEmail, setUserEmail] = useState("");

    const handleSubmit = () => {
      addMember(user.token, {
        userEmail: userEmail,
        boardId: currrentBoardId,
      });
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
        <h2 className="modal-title">Add User To Board</h2>
        <input
          autoFocus
          className="modal-board-text"
          type="email"
          name="userEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <div className="modal-button-container">
          <button className="modal-board-button" type="submit">
            Add User
          </button>
        </div>
      </form>
    );
  };

  const RemoveUserModal = () => (
    <div className="modal-body">
      <h2 className="modal-title">Remove User From Board</h2>
      <div className="modal-button-container">
        <p className="remove-user-email">{userToRemoveEmail}</p>
        <button
          className="delete-button"
          style={{ margin: "0px" }}
          onClick={() => {
            removeMember(user.token, {
              userEmail: userToRemoveEmail,
              boardId: currrentBoardId,
            });
            socket.emit("remove-member", userToRemoveEmail);
            setUserEmail("");
            closeModal();
          }}
        >
          Remove User
        </button>
      </div>
    </div>
  );

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        {type === "ADD" ? <AddUserModal /> : null}
        {type === "REMOVE" ? <RemoveUserModal /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    user: state.user.userData,
    currrentBoardId: state.board.selectBoard.id,
    userToRemoveEmail: state.board.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addMember: (token, addObj) => dispatch(addMemberToBoard(token, addObj)),
    removeMember: (token, removeObj) =>
      dispatch(removeMemberFromBoard(token, removeObj)),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
