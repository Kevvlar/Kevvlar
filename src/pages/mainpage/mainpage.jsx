import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import LeftSideNav from "../../components/sidenav-left/SideNavLeft";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import Modal from "../../components/modal/Modal";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";

import {} from "../../redux";

import "./mainPage.css";

class MainPage extends React.Component {
  render() {
    return (
      <div className="todopage">
        <AppBar />
        <BoardNavBar />
        {this.props.leftSideNav ? <LeftSideNav /> : null}
        {this.props.rightSideNav ? <RightSideNav /> : null}
        {this.props.boardId ? (
          <ColumnHolder />
        ) : (
          <div className="no-active-board">
            <div className="content">
              <h2 className="content-title">No board selected</h2>
              <p className="content-body">
                There is currently no active board please create one, or select
                a board from the boards panel.
              </p>
            </div>
          </div>
        )}
        {this.props.showModal ? <Modal /> : null}
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
    showModal: state.modal.showModal,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
