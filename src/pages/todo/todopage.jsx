import React, { Component } from "react";

import AppBar from "../../components/appbar/appbar.component";
import LeftSideNav from "../../components/sidenav-left/sidenav-left.component";
import RightSideNav from "../../components/sidenav-right/sidenav-right.component";
import ColumnHolder from "../../components/column-holder/column-holder.component";

import "./todopage.styles.css";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      leftSideBar: false,
      sideBarRight: false,
    };
  }

  handleMenuClick = () => {
    this.setState({ leftSideBar: !false });
  };

  handleHideLeftSideNav = () => {
    this.setState({ leftSideBar: false });
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
          onClickMenu={this.handleMenuClick}
        />
        {this.state.leftSideBar ? (
          <LeftSideNav hideLeftSideNav={this.handleHideLeftSideNav} />
        ) : null}
        {this.state.sideBarRight ? <RightSideNav /> : null}
        <ColumnHolder />
      </div>
    );
  }
}

export default Todo;
