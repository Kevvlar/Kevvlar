import React from "react";
import { FaBell } from "react-icons/fa";

import "./notification-icon.styles.css";

const NotificationIcon = ({ onNotificationClick }) => (
  <div className="notification-icon-container">
    <FaBell onClick={onNotificationClick} className="notification-icon" />
  </div>
);

export default NotificationIcon;
