import React from "react";

import "./user-profile.styles.css";

const UserProfile = () => (
  <div className="user-profile-container">
    <img
      className="user-profile-image"
      alt="img"
      src="https://robohash.org/620050a4db5104bae758cd75171d64ca?size=100x100"
    />
    <div className="user-profile-name">JohnDoe</div>
  </div>
);

export default UserProfile;
