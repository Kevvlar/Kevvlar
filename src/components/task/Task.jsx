import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import socket from "../../Socket";

import {
  setCurrentBoardData,
  toggleRightSideNav,
  clearColumns,
  fetchColumns,
  fetchBoard,
} from "../../redux";

import "./task.css";

const TaskItem = ({
  info,
  setSelectBoardData,
  toggleRightSideNav,
  history,
  resetColumns,
  user,
  getColumns,
  getBoard,
}) => (
  <div className="task-item-holder">
    <div className="task-item">
      <span
        className="board-title-link"
        onClick={() => {
          socket.close();
          resetColumns();
          getBoard(user.token, info.boardId);
          getColumns(user.token, info.boardId);
          socket.connect();
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectBoardData: (board) => dispatch(setCurrentBoardData(board)),
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
