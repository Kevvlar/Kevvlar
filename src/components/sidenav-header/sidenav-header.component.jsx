import React from "react";
import { FaEllipsisH, FaBars } from "react-icons/fa";

import "./sidenav-header.styles.css";

const SideNavHeader = ({ hideSideNav }) => (
  <div className="sidenav-header-container">
    <div className="sidenav-header-ham-icon-container">
      <FaBars onClick={hideSideNav} />
    </div>
    <span className="sidenav-header-current-board">New board 4</span>
    <div className="sidenav-header-more-icon">
      <FaEllipsisH />
    </div>
  </div>
);

export default SideNavHeader;
