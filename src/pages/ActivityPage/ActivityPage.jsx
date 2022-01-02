import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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
  handleAddNewColumnLocal,
  editColumnLocal,
  handleDeleteColumnLocal,
  addNewCardLocal,
  editCardLocal,
  deleteCardLocal,
} from "../../redux";

import "./activityPage.css";

const MainPage = ({
  history,
  fetchUpdates,
  rightSideNav,
  showModal,
  user,
  boardId,
  updateColumnsOrderLocal,
  updateCardsOrder,
  changeCardColumn,
  addNewColumn,
  updateColumn,
  removeColumn,
  createCard,
  updateCard,
  handleDeleteCard,
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
      // console.log(data);
      updateColumnsOrderLocal(data);
    };
    socket.on("receive-column-order", handler);
    return () => {
      socket.off("receive-column-order", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      updateCardsOrder(data);
    };
    socket.on("receive-cards-order", handler);
    return () => {
      socket.off("receive-cards-order", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      changeCardColumn(data);
    };
    socket.on("receive-card-column", handler);
    return () => {
      socket.off("receive-card-column", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      addNewColumn(data);
    };
    socket.on("receive-new-column", handler);
    return () => {
      socket.off("receive-new-column", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      updateColumn(data);
    };
    socket.on("receive-edit-column", handler);
    return () => {
      socket.off("receive-edit-column", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      removeColumn(data);
    };
    socket.on("receive-delete-column", handler);
    return () => {
      socket.off("receive-delete-column", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      createCard(data);
    };
    socket.on("receive-new-card", handler);
    return () => {
      socket.off("receive-new-card", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      updateCard(data);
    };
    socket.on("receive-edit-card", handler);
    return () => {
      socket.off("receive-edit-card", handler);
    };
  });

  useEffect(() => {
    const handler = (data) => {
      // console.log(data);
      handleDeleteCard(data);
    };
    socket.on("receive-delete-card", handler);
    return () => {
      socket.off("receive-delete-card", handler);
    };
  });

  useEffect(() => {
    const handler = (email) => {
      if (user.email === email) {
        history.push("/boards");
      }
    };
    socket.on("receive-email", handler);
    return () => {
      socket.off("receive-email", handler);
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
    addNewColumn: (columnObj) => dispatch(handleAddNewColumnLocal(columnObj)),
    updateColumn: (columnObj) => dispatch(editColumnLocal(columnObj)),
    removeColumn: (columnId) => dispatch(handleDeleteColumnLocal(columnId)),
    createCard: (cardObj) => dispatch(addNewCardLocal(cardObj)),
    updateCard: (cardObj) => dispatch(editCardLocal(cardObj)),
    handleDeleteCard: (deleteObj) => dispatch(deleteCardLocal(deleteObj)),
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
