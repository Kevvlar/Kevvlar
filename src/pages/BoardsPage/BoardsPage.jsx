import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import AppBar from "../../components/appbar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardList from "../../components/BoardList/BoardList";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import Modal from "../../components/modal/Modal";
import ChatButton from "../../components/ChatButton/ChatButton";
import ChatModal from "../../components/modal/ChatModal/ChatModal";
// import ErrorPage from "../ErrorPage/ErrorPage";

import { CHAT_MODAL } from "../../redux/modal/modalTypes";

import { LoadingIcon } from "../../assets/svg/iconlibrary";

import {
  fetchBoards,
  getNotifications,
  getNotificationStatus,
} from "../../redux";

import "./boardsPage.css";

class BoardsPage extends React.Component {
  componentDidMount() {
    this.props.getNotifyStatus(this.props.user.token);
    this.props.getNotifications(this.props.user.token);
    this.props.getBoards(this.props.user.token);

    window.onoffline = (event) => {
      this.props.history.push("/error");
    };
  }

  render() {
    return (
      <div className="boards-page-holder">
        <AppBar />
        <div
          style={{
            display: this.props.modalType === CHAT_MODAL ? "block" : "none",
          }}
        >
          <ChatModal />
        </div>
        <div className="boards-page">
          <div className="board-main">
            <SearchBar />
            {this.props.boardState ? (
              <LoadingIcon />
            ) : (
              <div>
                <div className="boards-container">
                  <h2 className="all-boards-title">All Boards</h2>
                  <BoardList />
                </div>
                <div className="boards-container">
                  <h2 className="all-boards-title">Team Boards</h2>
                </div>
              </div>
            )}
          </div>
        </div>
        {this.props.showModal ? <Modal /> : null}
        {this.props.rightSideNav ? <RightSideNav /> : null}
        <ChatButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rightSideNav: state.sideNavRight.rightSideNav,
    showModal: state.modal.showModal,
    user: state.user.userData,
    boardState: state.board.loading,
    modalType: state.modal.modalType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoards: (token) => dispatch(fetchBoards(token)),
    getNotifications: (token) => dispatch(getNotifications(token)),
    getNotifyStatus: (token) => dispatch(getNotificationStatus(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardsPage));
