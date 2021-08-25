import React from "react";
import { FaBars } from "react-icons/fa";

import NotificationIcon from "../notification-icon/notification-icon.component";
import UserProfile from "../user-profile/user-profile.component";

import "./appbar.styles.css";

const AppBar = ({ onClickMenu, onNotificationClick }) => (
  <header>
    <div className="appbar-container">
      <div className="appbar-menu-container">
        <div onClick={onClickMenu} className="appbar-ham-icon-container">
          <FaBars className="appbar-ham-icon" />
        </div>
        <input className="appbar-input" type="text" placeholder="Enter Board" />
      </div>
      <div className="appbar-logo primary-text-color">KEVVLAR</div>
      <div className="appbar-user-menu-container">
        <NotificationIcon onNotificationClick={onNotificationClick} />
        <UserProfile />
      </div>
    </div>
  </header>
);

export default AppBar;