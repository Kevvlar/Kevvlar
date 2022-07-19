import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import socket from "../../../Socket";

import {
  closeModal,
  getUserEmail,
  removeMemberFromBoard,
} from "../../../redux";

import "./boardUsersModal.css";

const BoardUserModal = ({
  closeModal,
  type,
  user,
  currrentBoardId,
  setUserEmail,
  userToRemoveEmail,
  removeMember,
  admins,
  members,
}) => {
  const users = [...admins, ...members];

  const handleRemoveMember = () => {
    removeMember(user.token, {
      userEmail: userToRemoveEmail,
      boardId: currrentBoardId,
    });
    socket.emit("remove-member", userToRemoveEmail);
    setUserEmail("");
    closeModal();
  };

  return (
    <div className="manage-users-modal-board">
      <div className="close-icon-container"></div>
      <div className="modal-body">
        <h2 className="modal-title">Manage Users</h2>
        <div className="manage-user-container">
          {users.map((user, index) => (
            <div className="manage-users-holder" key={index}>
              <div className="assign-user-list-container">
                <img
                  className="user-avatar-image assign-user-image"
                  alt="img"
                  src={user?.photo}
                  title={user?.name}
                />
                <div>
                  <div className="assign-user-list-name">{user?.name}</div>
                  <div className="assign-user-list-email">{user?.email}</div>
                </div>
              </div>
              <button
                className="delete-button"
                style={{ margin: "0px" }}
                onClick={handleRemoveMember}
              >
                Remove User
              </button>
            </div>
          ))}
        </div>
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
    admins: state.board.selectBoard.admins,
    members: state.board.selectBoard.members,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    removeMember: (token, removeObj) =>
      dispatch(removeMemberFromBoard(token, removeObj)),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardUserModal);
