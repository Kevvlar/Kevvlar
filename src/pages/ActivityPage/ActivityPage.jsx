import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";

import {} from "../../redux";

import "./activityPage.css";

class MainPage extends React.Component {
  render() {
    return (
      <div className="todopage">
        <AppBar />
        <BoardNavBar />
        {this.props.rightSideNav ? <RightSideNav /> : null}
        <ColumnHolder />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
