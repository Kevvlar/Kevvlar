import React, { Component } from "react";

import AppBar from "../../components/appbar/appbar.component";
import LeftSideNav from "../../components/sidenav-left/sidenav-left.component";
import RightSideNav from "../../components/sidenav-right/sidenav-right.component";
import ColumnHolder from "../../components/column-holder/column-holder.component";
import Modal from "../../components/modal/modal.component";

import "./mainpage.styles.css";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      leftSideBar: false,
      sideBarRight: false,
      showModal: false,
      actionType: "card",
    };
  }

  handleSetBoardActionType = () => {
    this.setState({ actionType: "board" });
  };

  handleSetCardActionType = () => {
    this.setState({ actionType: "card" });
  };

  handleSetColumnActionType = () => {
    this.setState({ actionType: "column" });
  };

  handleMenuClick = () => {
    this.setState({ leftSideBar: !false });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleHideModal = () => {
    this.setState({ showModal: false });
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
        {this.state.showModal ? (
          <Modal
            hideModal={this.handleHideModal}
            actionType={this.state.actionType}
          />
        ) : null}
        {this.state.leftSideBar ? (
          <LeftSideNav
            hideLeftSideNav={this.handleHideLeftSideNav}
            setBoardActionType={this.handleSetBoardActionType}
            showModal={this.handleShowModal}
          />
        ) : null}
        {this.state.sideBarRight ? <RightSideNav /> : null}
        <ColumnHolder
          setCardActionType={this.handleSetCardActionType}
          setColumnActionType={this.handleSetColumnActionType}
          showModal={this.handleShowModal}
        />
      </div>
    );
  }
}

export default MainPage;
