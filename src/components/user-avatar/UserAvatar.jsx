import React from "react";

import "./userAvatar.css";

<<<<<<< HEAD
const UserAvatar = ({ user, showUserModal, setUserEmail, selectBoard }) => (
  <div
    className="user-avatar-container"
    onClick={() => {
      if (selectBoard.admins.includes(user._id)) {
        setUserEmail(user.email);
        showUserModal("REMOVE");
      }
    }}
  >
=======
const UserAvatar = ({ user }) => (
  <div className="user-avatar-container">
>>>>>>> parent of 47dbad0 (Added the remove user from board feature)
    <img
      className="user-avatar-image"
      alt="img"
      src={user.photo}
      title={user.name}
    />
  </div>
);

<<<<<<< HEAD
const mapStateToProps = (state) => {
  return {
    type: state.modal.modalActionType,
    selectBoard: state.board.selectBoard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: (type) => dispatch(setUserModal(type)),
    setUserEmail: (email) => dispatch(getUserEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
=======
export default UserAvatar;
>>>>>>> parent of 47dbad0 (Added the remove user from board feature)
