import React from "react";
import { connect } from "react-redux";

import AppBar from "../../components/appbar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardList from "../../components/BoardList/BoardList";
import Modal from "../../components/modal/Modal";

import { setBoardModal } from "../../redux";

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
            <div className="board-list-holder">
              <BoardList />
              <div
                className="add-board-button sub-color"
                onClick={() => showBoardModal()}
              >
                + New Board
              </div>
            </div>
          </div>

          <div className="boards-container">
            <h2 className="all-boards-title">Team Board</h2>
            <div className="board-list-holder">
              <div className="add-board-button sub-color">+ New Board</div>
            </div>
          </div>
        </div>
      </div>
      {showModal ? <Modal /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showModal: state.modal.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showBoardModal: () => dispatch(setBoardModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsPage);
