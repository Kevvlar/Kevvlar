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
      isGrid: true,
    };
  }

  handleToggleGrid = () => {
    this.setState({ isGrid: true });
  };

  handleToggleFlat = () => {
    this.setState({ isGrid: false });
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

  handleMenuClick = () => {
    this.setState({ leftSideBar: !false });
  };

  // Handling creating and editing actions of  modals
  handleCreateBoardActionType = () => {
    this.setState({ actionType: "CREATE_BOARD" });
  };

  handleEditBoardActionType = () => {
    this.setState({ actionType: "EDIT_BOARD" });
  };

  handleDeleteModalActionType = () => {
    this.setState({ actionType: "DELETE" });
  };

  handleSetCardActionType = () => {
    this.setState({ actionType: "card" });
  };

  handleCreateColumnActionType = () => {
    this.setState({ actionType: "CREATE_COLUMN" });
  };

  handleEditColumnActionType = () => {
    this.setState({ actionType: "EDIT_COLUMN" });
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
            createBoardActionType={this.handleCreateBoardActionType}
            editBoardActionType={this.handleEditBoardActionType}
            deleteModalActionType={this.handleDeleteModalActionType}
            showModal={this.handleShowModal}
          />
        ) : null}
        {this.state.sideBarRight ? (
          <RightSideNav
            toggleFlat={this.handleToggleFlat}
            toggleGrid={this.handleToggleGrid}
          />
        ) : null}
        <ColumnHolder
          setCardActionType={this.handleSetCardActionType}
          createColumnActionType={this.handleCreateColumnActionType}
          editColumnActionType={this.handleEditColumnActionType}
          deleteModalActionType={this.handleDeleteModalActionType}
          showModal={this.handleShowModal}
          isGrid={this.state.isGrid}
        />
      </div>
    );
  }
}

export default MainPage;
