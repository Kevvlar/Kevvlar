import React from "react";

import SideNavHeader from "../sidenav-left-header/sidenav-left-header.component";
import BoardList from "../board-list/BoardList";

import "./SideNavLeft.css";

const LeftSideNav = ({
  createBoardActionType,
  showModal,
  editBoardActionType,
  deleteModalActionType,
  setBoardId,
}) => {
  return (
    <nav className="sidenav-left-container">
      <SideNavHeader />
      <div className="sidenav-left-board-holder">
        <div className="sidenav-left-board-header">Boards</div>
        <BoardList />
      </div>
    </nav>
  );
};

export default LeftSideNav;
