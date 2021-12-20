import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal, addMemberToBoard } from "../../../redux";

import "./userModal.css";

const UserModal = ({ closeModal, type, addMember, user, currrentBoardId }) => {
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
      <h2 className="modal-title">Add User To Board</h2>
      <div className="modal-button-container">
        <button className="modal-cancel-button" onClick={closeModal}>
          Remove User
        </button>
      </div>
    </div>
  );

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        {type === "ADD" ? <AddUserModal /> : <RemoveUserModal />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    user: state.user.userData,
    currrentBoardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addMember: (token, addObj) => dispatch(addMemberToBoard(token, addObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
