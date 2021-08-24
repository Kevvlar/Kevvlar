import React from "react";
import { FaBell } from "react-icons/fa";

import "./notification-icon.styles.css";

const NotificationIcon = ({ count }) => (
  <div className="notification-icon-container">
    <FaBell className="notification-icon" />
    <span className="notification-icon-number">{count}</span>
  </div>
);

export default NotificationIcon;
