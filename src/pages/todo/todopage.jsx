import React, { Component } from "react";

import AppBar from "../../components/appbar/appbar.component";
import SideNav from "../../components/sidenav/sidenav.component";

import "./todopage.styles.css";

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      sideBar: false,
    };
  }

  handleClick = () => {
    this.setState({ sideBar: !false });
  };

  handleHideSideNav = () => {
    this.setState({ sideBar: false });
  };

  render() {
    return (
      <div className="todopage">
        <AppBar onClick={this.handleClick} />
        {this.state.sideBar ? (
          <SideNav hideSideNav={this.handleHideSideNav} />
        ) : null}
        <p>Main app goes here ...</p>
      </div>
    );
  }
}

export default Todo;
