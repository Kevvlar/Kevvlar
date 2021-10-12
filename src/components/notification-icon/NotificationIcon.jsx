import React from "react";
import { FaBell } from "react-icons/fa";
import { connect } from "react-redux";

import { toggleRightSideNav } from "../../redux/index";

import "./notificationIcon.css";

const NotificationIcon = ({ toggleRightSideNav }) => (
  <div className="notification-icon-container">
    <FaBell
      onClick={() => toggleRightSideNav()}
      className="notification-icon"
    />
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
  };
};

export default connect(null, mapDispatchToProps)(NotificationIcon);
