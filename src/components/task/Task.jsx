import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import socket from "../../Socket";

import {
  toggleRightSideNav,
  clearColumns,
  fetchColumns,
  fetchBoard,
} from "../../redux";

import "./task.css";

const TaskItem = ({
  info,
  toggleRightSideNav,
  history,
  resetColumns,
  user,
  getColumns,
  getBoard,
  boardId,
}) => (
  <div className="task-item-holder">
    <div className="task-item">
      <span
        className="board-title-link"
        onClick={() => {
          socket.emit("leave", boardId);
          resetColumns();
          getBoard(user.token, info.boardId);
          getColumns(user.token, info.boardId);
          socket.emit("join-board", info.boardId);
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TaskItem));
