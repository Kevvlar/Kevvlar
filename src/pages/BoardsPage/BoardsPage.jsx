import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardList from "../../components/BoardList/BoardList";
import RightSideNav from "../../components/sidenav-right/SideNavRight";
import Modal from "../../components/modal/Modal";

import "./boardsPage.css";

const BoardsPage = ({ rightSideNav, showModal }) => {
  return (
    <div>
      <AppBar />
      <div className="boards-page">
        <div className="board-main">
          <SearchBar />
          <div className="boards-container">
            <h2 className="all-boards-title">All Boards</h2>
            <BoardList />
          </div>

          <div className="boards-container">
            <h2 className="all-boards-title">Team Boards</h2>
          </div>
        </div>
      </div>
      {showModal ? <Modal /> : null}
      {rightSideNav ? <RightSideNav /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    leftSideNav: state.sideNavLeft.leftSideNav,
    rightSideNav: state.sideNavRight.rightSideNav,
    showModal: state.modal.showModal,
  };
};

export default connect(mapStateToProps, null)(BoardsPage);
