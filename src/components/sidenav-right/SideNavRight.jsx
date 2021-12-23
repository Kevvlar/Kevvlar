import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FaEllipsisH, FaThLarge, FaMinus } from "react-icons/fa";

import {
  toggleGridCard,
  toggleFlatCard,
  handleLogOutUser,
  toggleRightSideNav,
  clearBoards,
  clearColumns,
} from "../../redux/index.js";

import TaskList from "../task-list/TaskList";

import "./sideNavRight.css";

const RightSideNav = ({
  toggleGrid,
  toggleFlat,
  logUserOut,
  toggleRightSideNav,
  history,
  emptyBoards,
  emptyColumns,
}) => {
  const handleSignOut = () => {
    toggleRightSideNav();
    emptyBoards();
    emptyColumns();
    logUserOut(history);
  };

  return (
    <nav className="sidenav-right-container">
      <div className="sidenav-right-menu-icons-container">
        <p className="sidenav-right-menu-title">Feature 3</p>
        <button className="sidenav-right-more-icon">
          <FaEllipsisH />
        </button>
        <button className="sidenav-right-grid-icon">
          <FaThLarge onClick={() => toggleGrid()} />
        </button>
        <button className="sidenav-right-minus-icon">
          <FaMinus onClick={() => toggleFlat()} />
        </button>
      </div>
      <div className="sidenav-right-menu-activity">
        <div className="sidenav-right-activity-title">Tasks due</div>
        <TaskList length={20} />
        <div onClick={handleSignOut} className="sidenav-right-logout">
          Log out
        </div>
      </div>
    </nav>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleGrid: () => dispatch(toggleGridCard()),
    toggleFlat: () => dispatch(toggleFlatCard()),
    logUserOut: (history) => dispatch(handleLogOutUser(history)),
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
    emptyBoards: () => dispatch(clearBoards()),
    emptyColumns: () => dispatch(clearColumns()),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(RightSideNav));
