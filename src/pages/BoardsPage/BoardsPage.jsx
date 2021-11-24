import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardList from "../../components/BoardList/BoardList";
import Modal from "../../components/modal/Modal";

import "./boardsPage.css";

const BoardsPage = ({ showBoardModal, showModal }) => {
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
    </div>
  );
};

export default connect()(BoardsPage);
