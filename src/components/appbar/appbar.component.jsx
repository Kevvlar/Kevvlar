import React from "react";
import { FaBars } from "react-icons/fa";

import NotificationIcon from "../notification-icon/notification-icon.component";

import "./appbar.styles.css";

const AppBar = ({ onClick }) => (
  <header>
    <div className="appbar-container">
      <div className="appbar-menu-container">
        <div onClick={onClick} className="appbar-ham-icon-container">
          <FaBars className="appbar-ham-icon" />
        </div>
        <p>
          <input className="appbar-input" type="text" value="Some text here" />
        </p>
      </div>
      <p className="appbar-logo primary-text-color">KEVVLAR</p>
      <div className="appbar-user-menu-container">
        <NotificationIcon />
        <p className="appbar-logo primary-text-color">Profile</p>
      </div>
    </div>
  </header>
);

export default AppBar;
