import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import AppBar from "../../components/appbar/AppBar";
import Modal from "../../components/modal/Modal";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import ColumnHolder from "../../components/column-holder/ColumnHolder";
import BoardNavBar from "../../components/board-nav-bar/BoardNavBar";

import socket from "../../Socket";

import {
  getUpdate,
  handleChangeCardColumnIO,
  changeCardsOderIo,
  handleAddNewColumnLocal,
  editColumnLocal,
  changeColumnsOrderLocal,
  handleDeleteColumnLocal,
} from "../../redux";

import "./activityPage.css";

const MainPage = ({
  fetchUpdates,
  rightSideNav,
  showModal,
  user,
  boardId,
  updateCardsOrderIO,
  changeCardColumnIo,
  addNewColumnIO,
  editColumnIO,
  deleteColumnIO,
  updateColumnsOrderLocal,
}) => {
  const { boardId: selectBoardId } = useParams();

  useEffect(() => {
    fetchUpdates(user.token, boardId);
  }, [boardId, user, fetchUpdates]);

  useEffect(() => {
    socket.emit("join-board", selectBoardId);
    return () => {
      socket.off("join-board", selectBoardId);
    };
  }, [selectBoardId]);

  useEffect(() => {
    const handler = (change) => {
      updateColumnsOrderLocal(change);
    };
    socket.on("receive-columns-order", handler);
    return () => {
      socket.off("receive-columns-order", handler);
    };
  }, [updateColumnsOrderLocal]);

  useEffect(() => {
    const handler = (changeObj) => {
      updateCardsOrderIO(changeObj);
    };
    socket.on("receive-cards-order-change", handler);
    return () => {
      socket.off("receive-cards-order-change", handler);
    };
  }, [updateCardsOrderIO]);

  useEffect(() => {
    const handler = (changeObj) => {
      changeCardColumnIo(changeObj);
    };
    socket.on("receive-card-column-change", handler);
    return () => {
      socket.off("receive-card-column-change", handler);
    };
  }, [changeCardColumnIo]);

  useEffect(() => {
    const handler = (columnObj) => {
      addNewColumnIO(columnObj);
    };
    socket.on("receive-new-column", handler);
    return () => {
      socket.off("receive-new-column", handler);
    };
  }, [addNewColumnIO]);

  useEffect(() => {
    const handler = (columnObj) => {
      editColumnIO(columnObj);
    };
    socket.on("receive-edit-column", handler);
    return () => {
      socket.off("receive-edit-column", handler);
    };
  }, [editColumnIO]);

  useEffect(() => {
    const handler = (columnId) => {
      deleteColumnIO(columnId);
    };
    socket.on("receive-delete-column", handler);
    return () => {
      socket.off("receive-delete-column", handler);
    };
  }, [deleteColumnIO]);

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
    updateCardsOrderIO: (changeObj) => dispatch(changeCardsOderIo(changeObj)),
    addNewColumnIO: (columnObj) => dispatch(handleAddNewColumnLocal(columnObj)),
    editColumnIO: (columnObj) => dispatch(editColumnLocal(columnObj)),
    changeCardColumnIo: (changeObj) =>
      dispatch(handleChangeCardColumnIO(changeObj)),
    deleteColumnIO: (columnId) => dispatch(handleDeleteColumnLocal(columnId)),
    updateColumnsOrderLocal: (changeObj) =>
      dispatch(changeColumnsOrderLocal(changeObj)),
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
