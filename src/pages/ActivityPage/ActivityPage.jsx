import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import AppBar from "../../components/appbar/AppBar";
import Modal from "../../components/modal/Modal";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";
import ActivityModal from "../../components/ActivityModal/ActivityModal";
import FileModal from "../../components/FileModal/FileModal";
import ChatButton from "../../components/ChatButton/ChatButton";
import ChatModal from "../../components/modal/ChatModal/ChatModal";
import ConferenceModal from "../../components/modal/ConferenceModal/ConferenceModal";

import { CHAT_MODAL } from "../../redux/modal/modalTypes";

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
  clearColumns,
  closeModal,
} from "../../redux";

import "./activityPage.css";

class MainPage extends React.Component {
  componentDidMount() {
    socket.connect();
    socket.emit("newUser", this.props.user._id);
    socket.emit("join-board", this.props.boardId);
    this.props.getNotifyStatus(this.props.user.token);
    this.props.getColumns(this.props.user.token, this.props.boardId);

    window.onoffline = () => {
      this.props.history.push("/error");
    };

    window.onpopstate = () => {
      this.props.closeModal();
    };

    socket.off("kill").on("kill", (data) => {
      console.log(data);
    });

    socket.off("receive-column-order").on("receive-column-order", (data) => {
      // console.log(data);
      this.props.updateColumnsOrderLocal(data);
    });

    socket.off("receive-cards-order").on("receive-cards-order", (data) => {
      // console.log(data);
      this.props.updateCardsOrder(data);
    });

    socket.off("receive-card-column").on("receive-card-column", (data) => {
      // console.log(data);
      this.props.changeCardColumn(data);
    });

    socket.off("receive-new-column").on("receive-new-column", (data) => {
      // console.log(data);
      this.props.addNewColumn(data);
    });

    socket.off("receive-edit-column").on("receive-edit-column", (data) => {
      // console.log(data);
      this.props.updateColumn(data);
    });

    socket.off("receive-delete-column").on("receive-delete-column", (data) => {
      // console.log(data);
      this.props.removeColumn(data);
    });

    socket.off("receive-new-card").on("receive-new-card", (data) => {
      // console.log(data);
      this.props.createCard(data);
    });

    socket.off("receive-edit-card").on("receive-edit-card", (data) => {
      // console.log(data);
      this.props.updateCard(data);
    });

    socket.off("receive-delete-card").on("receive-delete-card", (data) => {
      // console.log(data);
      this.props.handleDeleteCard(data);
    });

    socket.off("receive-email").on("receive-email", (email) => {
      if (this.props.user.email === email) {
        this.props.history.push("/boards");
      }
    });
  }

  componentWillUnmount() {
    socket.emit("exit", this.props.boardId);

    socket.off("kill");

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

    socket.disconnect();

    this.props.emptyColumns();
  }

  handleShowConferenceModal = () => {
    switch (this.props.conferenceState) {
      case "show":
        return (
          <span style={{ display: "block" }}>
            <ConferenceModal />
          </span>
        );
      case "mini":
        return (
          <span style={{ display: "none" }}>
            <ConferenceModal />
          </span>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="todopage">
        <BoardNavBar />
        <ColumnHolder />
        <AppBar />
        <span
          style={{
            display: this.props.modalType === CHAT_MODAL ? "block" : "none",
          }}
        >
          <ChatModal />
        </span>
        {this.handleShowConferenceModal()}
        {this.props.rightSideNav ? <RightSideNav /> : null}
        {this.props.showModal ? <Modal /> : null}
        {this.props.activity ? <ActivityModal /> : null}
        {this.props.showFile ? <FileModal /> : null}
        <ChatButton />
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
    emptyColumns: () => dispatch(clearColumns()),
    closeModal: () => dispatch(closeModal()),
  };
};

const mapStateToProps = (state) => {
  return {
    boardId: state.board.selectBoard.id,
    user: state.user.userData,
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
    activity: state.activity.showActivity,
    showModal: state.modal.showModal,
    showFile: state.file.showFile,
    modalType: state.modal.modalType,
    conferenceState: state.modal.conferenceState,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
