import React from "react";
import { connect } from "react-redux";
import { LoadingIcon } from "../../assets/svg/iconlibrary";
import { withRouter } from "react-router-dom";

import { fetchColumns, getNotificationStatus, fetchBoard } from "../../redux";

import socket from "../../Socket";

import "./errorPage.css";

class ErrorPage extends React.Component {
  componentDidMount() {
    window.ononline = (event) => {
      socket.connect();
      socket.emit("newUser", this.props.user._id);
      socket.emit("join-board", this.props.board.id);
      this.props.getBoard(this.props.user.token, this.props.board.id);
      this.props.getColumns(this.props.user.token, this.props.board.id);
      this.props.getNotifyStatus(this.props.user.token);
      this.props.history.goBack();
    };
  }

  render() {
    return (
      <div className="error-page">
        <LoadingIcon />
        <h2 className="error-page-h2">Establishing connection</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    board: state.board.selectBoard,
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getColumns: (token, boardId) => dispatch(fetchColumns(token, boardId)),
    getNotifyStatus: (token) => dispatch(getNotificationStatus(token)),
    getBoard: (token, boardId) => dispatch(fetchBoard(token, boardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorPage));
