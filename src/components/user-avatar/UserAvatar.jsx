import React from "react";
import { connect } from "react-redux";

import "./userAvatar.css";

import { setUserModal, getUserEmail } from "../../redux";

const UserAvatar = ({
  user,
  showUserModal,
  setUserEmail,
  currentUserId,
  selectBoard,
}) => (
  <div
    className="user-avatar-container"
    onClick={() => {
      setUserEmail(user.email);
      showUserModal("REMOVE");
    }}
  >
    <img
      className="user-avatar-image"
      alt="img"
      src={user.photo}
      title={user.name}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    selectBoard: state.board.selectBoard,
    currentUserId: state.user.userData._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: (type) => dispatch(setUserModal(type)),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
