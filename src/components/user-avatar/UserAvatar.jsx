import React from "react";

import "./userAvatar.css";

const UserAvatar = ({ user }) => (
  <div className="user-avatar-container">
    <img
      className="user-avatar-image"
      alt="img"
      src={user.photo}
      title={user.name}
    />
  </div>
);

export default UserAvatar;
