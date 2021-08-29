import React from "react";
import { Link } from "react-router-dom";
import { FaEllipsisH, FaThLarge, FaMinus } from "react-icons/fa";

import TaskList from "../task-list/task-list.component";

import "./sidenav-right.styles.css";

const RightSideNav = () => (
  <nav className="sidenav-right-container">
    <div className="sidenav-right-menu-icons-container">
      <p className="sidenav-right-menu-title">Feature 3</p>
      <button className="sidenav-right-more-icon">
        <FaEllipsisH />
      </button>
      <button className="sidenav-right-grid-icon">
        <FaThLarge />
      </button>
      <button className="sidenav-right-minus-icon">
        <FaMinus />
      </button>
    </div>
    <div className="sidenav-right-menu-activity">
      <div className="sidenav-right-activity-title">Tasks due</div>
      <TaskList length={20} />
      <Link to="/" className="sidenav-right-logout">
        Log out
      </Link>
    </div>
  </nav>
);

export default RightSideNav;
