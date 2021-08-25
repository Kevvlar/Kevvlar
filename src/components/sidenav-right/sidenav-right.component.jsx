import React from "react";
import { FaEllipsisH, FaThLarge, FaMinus, FaTimes } from "react-icons/fa";

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
      <div className="sidenav-right-task-holder">
        <div className="task-item">
          Card title - 08/17/2021 <div class="task-item-board">Feature 3</div>
        </div>
        <FaTimes className="task-cancel-icon" />
      </div>
      <div className="sidenav-right-task-holder">
        <div className="task-item">
          Card title - 08/17/2021 <div class="task-item-board">Feature 3</div>
        </div>
        <FaTimes className="task-cancel-icon" />
      </div>
      <div className="sidenav-right-task-holder">
        <div className="task-item">
          Card title - 08/17/2021 <div class="task-item-board">Feature 3</div>
        </div>
        <FaTimes className="task-cancel-icon" />
      </div>
      <div className="sidenav-right-task-holder">
        <div className="task-item">
          Card title - 08/17/2021 <div class="task-item-board">Feature 3</div>
        </div>
        <FaTimes className="task-cancel-icon" />
      </div>

      <div className="sidenav-right-logout">Log out</div>
    </div>
  </nav>
);

export default RightSideNav;
