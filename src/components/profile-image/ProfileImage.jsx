import React from "react";
import { connect } from "react-redux";

import "./profileImage.css";

const UserProfile = ({ user }) => (
  <div className="user-profile-container">
    <img className="user-profile-image" alt="img" src={user.photo} />
    <div className="user-profile-name"></div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(UserProfile);
