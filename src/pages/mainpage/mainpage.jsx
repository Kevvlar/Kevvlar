import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import LeftSideNav from "../../components/sidenav-left/SideNavLeft";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import Modal from "../../components/modal/Modal";

import "./mainPage.css";

function MainPage({ leftSideNav, rightSideNav, showModal }) {
  return (
    <div className="todopage">
      <AppBar />
      {leftSideNav ? <LeftSideNav /> : null}
      {rightSideNav ? <RightSideNav /> : null}
      <ColumnHolder />
      {showModal ? <Modal /> : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
    showModal: state.modal.showModal,
  };
};

export default connect(mapStateToProps, null)(MainPage);
