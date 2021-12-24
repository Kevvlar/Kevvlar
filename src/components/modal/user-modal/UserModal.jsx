import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import {
  closeModal,
  addMemberToBoard,
  removeMemberFromBoard,
  getUserEmail,
} from "../../../redux";

import "./userModal.css";

const UserModal = ({
  closeModal,
  type,
  addMember,
  removeMember,
  user,
  currrentBoardId,
  removeUserEmail,
  setUserEmail,
}) => {
  const AddUserModal = () => {
    const [userEmail, setUserEmail] = useState("");

    return (
      <div className="modal-body">
        <h2 className="modal-title">Add User To Board</h2>
        <input
          className="modal-board-text"
          type="email"
          name="userEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <div className="modal-button-container">
          <button
            className="modal-board-button"
            onClick={() => {
              addMember(user.token, {
                userEmail: userEmail,
                boardId: currrentBoardId,
              });
              closeModal();
            }}
          >
            Add User
          </button>
        </div>
      </div>
    );
  };

  const RemoveUserModal = () => (
    <div className="modal-body">
      <h2 className="modal-title">Remove User from Board</h2>
      <p className="user-email">{removeUserEmail}</p>
      <div className="modal-button-container">
        <button
          className="delete-button"
          style={{margin: '0px'}}
          onClick={() => {
            removeMember(user.token, {
              userEmail: removeUserEmail,
              boardId: currrentBoardId,
            });
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
    removeUserEmail: state.board.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
    addMember: (token, addObj) => dispatch(addMemberToBoard(token, addObj)),
    removeMember: (token, removeObj) =>
      dispatch(removeMemberFromBoard(token, removeObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
