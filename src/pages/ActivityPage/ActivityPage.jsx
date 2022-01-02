import React, { useEffect } from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import Modal from "../../components/modal/Modal";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";

import socket from "../../Socket";

import {
  getUpdate,
  changeColumnsOrderLocal,
  changeCardsOderIo,
  handleChangeCardColumnIO,
} from "../../redux";

import "./activityPage.css";

const MainPage = ({
  fetchUpdates,
  rightSideNav,
  showModal,
  user,
  boardId,
  updateColumnsOrderLocal,
  updateCardsOrder,
  changeCardColumn,
}) => {
  useEffect(() => {
    fetchUpdates(user.token, boardId);
  }, [boardId, user, fetchUpdates]);

  useEffect(() => {
    socket.connect();
    socket.emit("join-board", boardId);
  }, [boardId]);

  useEffect(() => {
    const handler = (data) => {
      console.log(data);
      updateColumnsOrderLocal(data);
    };
    socket.on("receive-column-order", handler);
    return () => {
      socket.off("receive-column-order", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      console.log(data);
      updateCardsOrder(data);
    };
    socket.on("receive-cards-order", handler);
    return () => {
      socket.off("receive-cards-order", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      console.log(data);
      changeCardColumn(data);
    };
    socket.on("receive-card-column", handler);
    return () => {
      socket.off("receive-card-column", handler);
    };
  });

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
  return {
    fetchUpdates: (token, boardId) => dispatch(getUpdate(token, boardId)),
    updateColumnsOrderLocal: (changeObj) =>
      dispatch(changeColumnsOrderLocal(changeObj)),
    updateCardsOrder: (changeObj) => dispatch(changeCardsOderIo(changeObj)),
    changeCardColumn: (data) => dispatch(handleChangeCardColumnIO(data)),
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
