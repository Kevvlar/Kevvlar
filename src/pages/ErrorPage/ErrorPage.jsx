import React from "react";
import { connect } from "react-redux";
import { LoadingIcon } from "../../assets/svg/iconlibrary";
import { withRouter } from "react-router-dom";

import socket from "../../Socket";

import "./errorPage.css";

class ErrorPage extends React.Component {
  componentDidMount() {
    window.ononline = (event) => {
      socket.connect();
      socket.emit("join-board", this.props.board.id);
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
  };
};

export default connect(mapStateToProps, null)(withRouter(ErrorPage));
