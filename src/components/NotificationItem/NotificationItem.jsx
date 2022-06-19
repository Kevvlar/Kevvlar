import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import socket from "../../Socket";
import dateFormat from "dateformat";

import {
  toggleRightSideNav,
  clearColumns,
  fetchColumns,
  fetchBoard,
  isReadServer,
  fetchCard,
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
  getCard,
  isCardNull,
  selectCard,
}) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const showCard = async () => {
    if (info.cardId) {
      await getCard(user.token, info.boardId, info.cardId);
      if (selectCard) {
        history.push({
          pathname: `/boards/${info.boardId}/${info.cardId}`,
        });
      }
    }
  };

  return (
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
            showCard();
            toggleRead(user.token, id);
            socket.connect();
            socket.emit("join-board", info.boardId);
            socket.emit("newUser", user._id);
            toggleRightSideNav();
          }}
        >
          {info.title} | {info.cardTitle}
        </span>
        <div className="task-item-board">
          {info.date} at{" "}
          {info.realTime
            ? dateFormat(
                info.realTime.toLocaleString("en-US", {
                  timeZone: timezone,
                }),
                "h:MM TT"
              )
            : info.time}
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
};
const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    boardId: state.board.selectBoard.id,
    isCardNull: state.column.isCardIsNull,
    selectCard: state.column.selectCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
    resetColumns: () => dispatch(clearColumns()),
    getColumns: (token, boardId) => dispatch(fetchColumns(token, boardId)),
    getBoard: (token, boardId) => dispatch(fetchBoard(token, boardId)),
    toggleRead: (token, id) => dispatch(isReadServer(token, id)),
    getCard: (token, boardId, cardId) =>
      dispatch(fetchCard(token, boardId, cardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NotificationItem));
