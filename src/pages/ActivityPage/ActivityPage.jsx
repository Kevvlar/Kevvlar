import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import Modal from "../../components/modal/Modal";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";

import {} from "../../redux";

import "./activityPage.css";

const MainPage = ({ showModal, rightSideNav }) => {
  return (
    <div className="todopage">
      <AppBar />
      <BoardNavBar />
      {rightSideNav ? <RightSideNav /> : null}
      <ColumnHolder />
      {showModal ? <Modal /> : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
    showModal: state.modal.showModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
