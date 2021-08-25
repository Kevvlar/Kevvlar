import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaEllipsisH, FaThLarge, FaMinus } from "react-icons/fa";

import TaskItem from "../task-item/task-item.component";

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
      <InfiniteScroll dataLength={35} hasMore={true} height={350}>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </InfiniteScroll>
      <div className="sidenav-right-logout">Log out</div>
    </div>
  </nav>
);

export default RightSideNav;
