import React from "react";
import { withRouter } from "react-router-dom";
import { FaEllipsisH, FaThLarge, FaMinus } from "react-icons/fa";

import TaskList from "../task-list/task-list.component";

import "./sidenav-right.styles.css";

class RightSideNav extends React.Component {
  handleSignOut = async () => {
    console.log("Logging out");
    this.props.history.push("/signin");
  };

  render() {
    return (
      <nav className="sidenav-right-container">
        <div className="sidenav-right-menu-icons-container">
          <p className="sidenav-right-menu-title">Feature 3</p>
          <button className="sidenav-right-more-icon">
            <FaEllipsisH />
          </button>
          <button className="sidenav-right-grid-icon">
            <FaThLarge onClick={this.props.toggleGrid} />
          </button>
          <button className="sidenav-right-minus-icon">
            <FaMinus onClick={this.props.toggleFlat} />
          </button>
        </div>
        <div className="sidenav-right-menu-activity">
          <div className="sidenav-right-activity-title">Tasks due</div>
          <TaskList length={20} />
          <div onClick={this.handleSignOut} className="sidenav-right-logout">
            Log out
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(RightSideNav);
