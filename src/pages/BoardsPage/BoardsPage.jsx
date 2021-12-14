import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardList from "../../components/BoardList/BoardList";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import Modal from "../../components/modal/Modal";

import { LoadingIcon } from "../../assets/svg/iconlibrary";

import { fetchBoards } from "../../redux";

import "./boardsPage.css";

class BoardsPage extends React.Component {
  componentDidMount() {
    this.props.getBoards(this.props.user.token);
  }

  render() {
    return (
      <div>
        <AppBar />
        <div className="boards-page">
          <div className="board-main">
            <SearchBar />
            {this.props.boardState ? (
              <LoadingIcon />
            ) : (
              <>
                <div className="boards-container">
                  <h2 className="all-boards-title">All Boards</h2>
                  <BoardList />
                </div>
                <div className="boards-container">
                  <h2 className="all-boards-title">Team Boards</h2>
                </div>
              </>
            )}
          </div>
        </div>
        {this.props.showModal ? <Modal /> : null}
        {this.props.rightSideNav ? <RightSideNav /> : null}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoards: (token) => dispatch(fetchBoards(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
