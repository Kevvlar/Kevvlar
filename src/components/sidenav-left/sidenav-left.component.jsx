import React from "react";

import SideNavHeader from "../sidenav-left-header/sidenav-left-header.component";
import SideNavBoardList from "../sidenav-left-board-list/sidenav-left-board-list.component";

import "./sidenav-left.styles.css";

const LeftSideNav = ({ hideLeftSideNav }) => {
  return (
    <nav className="sidenav-left-container">
      <SideNavHeader hideLeftSideNav={hideLeftSideNav} />
      <div className="sidenav-left-board-holder">
        <div className="sidenav-left-board-header">Boards</div>
        <SideNavBoardList />
      </div>
    </nav>
  );
};

export default LeftSideNav;
