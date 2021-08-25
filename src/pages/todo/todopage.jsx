import React, { Component } from "react";

import AppBar from "../../components/appbar/appbar.component";
import LeftSideNav from "../../components/sidenav-left/sidenav-left.component";

import "./todopage.styles.css";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      leftSideBar: false,
    };
  }

  handleMenuClick = () => {
    this.setState({ leftSideBar: !false });
  };

  handleHideLeftSideNav = () => {
    this.setState({ leftSideBar: false });
  };

  render() {
    return (
      <div className="todopage">
        <AppBar onClickMenu={this.handleMenuClick} />
        {this.state.leftSideBar ? (
          <LeftSideNav hideLeftSideNav={this.handleHideLeftSideNav} />
        ) : null}
        <p>Main app goes here ...</p>
      </div>
    );
  }
}

export default Todo;
