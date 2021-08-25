import React, { Component } from "react";

import AppBar from "../../components/appbar/appbar.component";
import SideNav from "../../components/sidenav/sidenav.component";
import RightSideNav from "../../components/sidenav-right/sidenav-right.component";

import "./todopage.styles.css";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      sideBar: false,
      sideBarRight: false,
    };
  }

  handleClick = () => {
    this.setState({ sideBar: !false });
  };

  handleHideSideNav = () => {
    this.setState({ sideBar: false });
  };

  handleNotificationClick = () => {
    if (this.state.sideBarRight === false) {
      this.setState({ sideBarRight: !false });
    } else {
      this.setState({ sideBarRight: false });
    }
  };

  render() {
    return (
      <div className="todopage">
        <AppBar
          onNotificationClick={this.handleNotificationClick}
          onClick={this.handleClick}
        />
        {this.state.sideBar ? (
          <SideNav hideSideNav={this.handleHideSideNav} />
        ) : null}
        {this.state.sideBarRight ? <RightSideNav /> : null}
        <p>Main app goes here ...</p>
      </div>
    );
  }
}

export default Todo;
