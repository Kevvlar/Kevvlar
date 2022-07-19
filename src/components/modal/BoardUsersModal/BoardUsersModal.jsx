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

import "./boardUsersModal.css";

const BoardUserModal = ({
  closeModal,
  type,
  addMember,
  user,
  currrentBoardId,
  setUserEmail,
  userToRemoveEmail,
  removeMember,
  admins,
  members,
}) => {
  const users = [...admins, ...members];
  const ManageUserModal = () => {
    const [userEmail, setUserEmail] = useState("");

    const handleSubmit = () => {
      addMember(user.token, {
        userEmail: userEmail,
        boardId: currrentBoardId,
      });
      closeModal();
    };

    return (
      <div
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="modal-body"
      >
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
                  <div className="assign-user-list-name">
                    {user?.name}
                  </div>
                  <div className="assign-user-list-email">
                    {user?.email}
                  </div>
                </div>
              </div>
              <button
                  className="delete-button"
                  style={{ margin: "0px" }}
                  onClick={() => {
                    removeMember(user.token, {
                      userEmail: user.email,
                      boardId: currrentBoardId,
                    });
                    socket.emit("remove-member", user.email);
                    setUserEmail("");
                    closeModal();
                  }}
                >
                  Remove User
                </button>
            </div>
          ))}
          </div>
        </div>
    );
  };

  return (
    <div className="manage-users-modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        {type === "ADD" ? <ManageUserModal /> : null}
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
    addMember: (token, addObj) => dispatch(addMemberToBoard(token, addObj)),
    removeMember: (token, removeObj) =>
      dispatch(removeMemberFromBoard(token, removeObj)),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardUserModal);
