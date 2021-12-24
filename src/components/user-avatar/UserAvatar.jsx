import React from "react";
import { connect } from "react-redux";

import { getUserEmail, setUserModal } from "../../redux";

import "./userAvatar.css";

const UserAvatar = ({
  user,
  userId,
  showUserModal,
  setUserEmail,
  selectBoard,
}) => (
  <div
    className="user-avatar-container"
    onClick={() => {
      if (selectBoard.admins.includes(userId)) {
        setUserEmail(user.email);
        showUserModal("REMOVE");
      }
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
    userId: state.user.userData._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: (type) => dispatch(setUserModal(type)),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
