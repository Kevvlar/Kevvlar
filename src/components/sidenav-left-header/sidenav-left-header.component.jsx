import React from "react";
import { FaEllipsisH, FaBars } from "react-icons/fa";

import "./sidenav-left-header.styles.css";

const LeftSideNavHeader = ({ hideLeftSideNav }) => (
  <div className="sidenav-left-header-container">
    <div className="sidenav-left-header-ham-icon-container">
      <FaBars onClick={hideLeftSideNav} />
    </div>
    <span className="sidenav-left-header-current-board">New board 4</span>
    <div className="sidenav-left-header-more-icon">
      <FaEllipsisH />
    </div>
  </div>
);

export default LeftSideNavHeader;
