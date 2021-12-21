import React from "react";
import { connect } from "react-redux";

import "./userAvatar.css";

const UserAvatar = ({ user }) => (
  <div className="user-avatar-container">
    <img className="user-avatar-image" alt="img" src={user.photo} title={user.name} />
  </div>
);

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(UserAvatar);
