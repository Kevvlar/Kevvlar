import React from "react";
import { FaBars } from "react-icons/fa";

import "./sidenav-left-header.styles.css";

const LeftSideNavHeader = ({ hideLeftSideNav }) => (
  <div className="sidenav-left-header-container">
    <div className="sidenav-left-header-ham-icon-container">
      <FaBars onClick={hideLeftSideNav} />
    </div>
  </div>
);

export default LeftSideNavHeader;
