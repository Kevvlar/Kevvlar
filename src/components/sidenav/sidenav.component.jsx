import React from "react";

import SideNavHeader from "../sidenav-header/sidenav-header.component";
import SideNavBoardList from "../sidenav-board-list/sidenav-board-list.component";

import "./sidenav.styles.css";

const SideNav = ({ hideSideNav }) => {
  return (
    <nav className="sidenav-container">
      <SideNavHeader hideSideNav={hideSideNav} />
      <div className="sidenav-board-holder">
        <div className="sidenav-board-header">Boards</div>
        <SideNavBoardList />
      </div>
    </nav>
  );
};

export default SideNav;
