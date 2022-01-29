import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import AppBar from "../../components/appbar/AppBar";
import Modal from "../../components/modal/Modal";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";
// import ErrorPage from "../ErrorPage/ErrorPage";

import socket from "../../Socket";

import {
  changeColumnsOrderLocal,
  changeCardsOderIo,
  handleChangeCardColumnIO,
  handleAddNewColumnLocal,
  editColumnLocal,
  handleDeleteColumnLocal,
  addNewCardLocal,
  editCardLocal,
  deleteCardLocal,
  fetchColumns,
  getNotificationStatus,
} from "../../redux";

import "./activityPage.css";

class MainPage extends React.Component {
  componentDidMount() {
    socket.emit("newUser", this.props.user._id);
    socket.emit("join-board", this.props.boardId);
    this.props.getNotifyStatus(this.props.user.token);
    this.props.getColumns(this.props.user.token, this.props.boardId);

    window.onoffline = (event) => {
      socket.disconnect();
      this.props.history.push("/error");
    };

    socket.on("receive-column-order", (data) => {
      // console.log(data);
      this.props.updateColumnsOrderLocal(data);
    });

    socket.on("receive-cards-order", (data) => {
      // console.log(data);
      this.props.updateCardsOrder(data);
    });

    socket.on("receive-card-column", (data) => {
      // console.log(data);
      this.props.changeCardColumn(data);
    });

    socket.on("receive-new-column", (data) => {
      // console.log(data);
      this.props.addNewColumn(data);
    });

    socket.on("receive-edit-column", (data) => {
      // console.log(data);
      this.props.updateColumn(data);
    });

    socket.on("receive-delete-column", (data) => {
      // console.log(data);
      this.props.removeColumn(data);
    });

    socket.on("receive-new-card", (data) => {
      // console.log(data);
      this.props.createCard(data);
    });

    socket.on("receive-edit-card", (data) => {
      // console.log(data);
      this.props.updateCard(data);
    });

    socket.on("receive-delete-card", (data) => {
      // console.log(data);
      this.props.handleDeleteCard(data);
    });

    socket.on("receive-email", (email) => {
      if (this.props.user.email === email) {
        this.props.history.push("/boards");
      }
    });
  }

  componentWillUnmount() {
    socket.off("newUser");
    socket.off("receive-new-column");

    socket.off("receive-column-order");

    socket.off("receive-cards-order");

    socket.off("receive-card-column");

    socket.off("receive-edit-column");

    socket.off("receive-delete-column");

    socket.off("receive-new-card");

    socket.off("receive-edit-card");

    socket.off("receive-delete-card");

    socket.off("receive-email");

    socket.emit("leave", this.props.boardId);
  }

  render() {
    return (
      <div className="todopage">
        <BoardNavBar />
        <ColumnHolder />
        <AppBar />
        {this.props.rightSideNav ? <RightSideNav /> : null}
        {this.props.showModal ? <Modal /> : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateColumnsOrderLocal: (changeObj) =>
      dispatch(changeColumnsOrderLocal(changeObj)),
    updateCardsOrder: (changeObj) => dispatch(changeCardsOderIo(changeObj)),
    changeCardColumn: (data) => dispatch(handleChangeCardColumnIO(data)),
    addNewColumn: (columnObj) => dispatch(handleAddNewColumnLocal(columnObj)),
    updateColumn: (columnObj) => dispatch(editColumnLocal(columnObj)),
    removeColumn: (columnId) => dispatch(handleDeleteColumnLocal(columnId)),
    createCard: (cardObj) => dispatch(addNewCardLocal(cardObj)),
    updateCard: (cardObj) => dispatch(editCardLocal(cardObj)),
    handleDeleteCard: (deleteObj) => dispatch(deleteCardLocal(deleteObj)),
    getColumns: (token, boardId) => dispatch(fetchColumns(token, boardId)),
    getNotifyStatus: (token) => dispatch(getNotificationStatus(token)),
  };
};

const mapStateToProps = (state) => {
  return {
    boardId: state.board.selectBoard.id,
    user: state.user.userData,
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
    showModal: state.modal.showModal,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
