import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import socket from "../../Socket";

import {
  toggleRightSideNav,
  clearColumns,
  fetchColumns,
  fetchBoard,
  isReadServer,
} from "../../redux";

import "./notificationItem.css";

const NotificationItem = ({
  id,
  read,
  info,
  toggleRightSideNav,
  history,
  resetColumns,
  user,
  getColumns,
  getBoard,
  boardId,
  toggleRead,
}) => (
  <div className="task-item-holder">
    <div className="task-item">
      <span
        className="board-title-link"
        title={info.cardTitle}
        onClick={() => {
          socket.emit("exit", boardId);
          socket.disconnect();
          resetColumns();
          getBoard(user.token, info.boardId);
          getColumns(user.token, info.boardId);
          toggleRead(user.token, id);
          socket.connect();
          socket.emit("join-board", info.boardId);
          socket.emit("newUser", user._id);
          history.push({
            pathname: `/boards/${info.boardId}`,
          });
          toggleRightSideNav();
        }}
      >
        {info.title} | {info.cardTitle}
      </span>
      <div className="task-item-board">
        {info.date} at {info.time}
      </div>
      <div
        onClick={() => {
          toggleRead(user.token, id);
        }}
        className={read === false ? "task-item-notification" : null}
      ></div>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    boardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
    resetColumns: () => dispatch(clearColumns()),
    getColumns: (token, boardId) => dispatch(fetchColumns(token, boardId)),
    getBoard: (token, boardId) => dispatch(fetchBoard(token, boardId)),
    toggleRead: (token, id) => dispatch(isReadServer(token, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationItem));
