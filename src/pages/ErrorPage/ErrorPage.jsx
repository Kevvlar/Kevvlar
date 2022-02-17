import React from "react";
import { connect } from "react-redux";
import { LoadingIcon } from "../../assets/svg/iconlibrary";
import { withRouter } from "react-router-dom";

import { fetchBoard } from "../../redux";

import "./errorPage.css";

class ErrorPage extends React.Component {
  componentDidMount() {
    window.ononline = (event) => {
      this.props.getBoard(this.props.user.token, this.props.board.id);
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
    getBoard: (token, boardId) => dispatch(fetchBoard(token, boardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ErrorPage));
