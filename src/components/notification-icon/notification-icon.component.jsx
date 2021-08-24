import React from "react";
import { FaBell } from "react-icons/fa";

import "./notification-icon.styles.css";

const NotificationIcon = () => (
  <div className="notification-icon-container">
    <FaBell className="notification-icon" />
  </div>
);

export default NotificationIcon;
