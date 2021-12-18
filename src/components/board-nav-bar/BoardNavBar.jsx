import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";

import { setUserModal } from "../../redux";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({ boardTitle, history, boardState, showUserModal }) => (
  <ScrollContainer
    className="scroll-container boardnavbar-scroll-container"
    horizontal={true}
  >
    <div className="boardnavbar">
      <button
        className="boardnavbar-btn"
        onClick={() => {
          if (boardState === true) {
            return;
          }
          history.push("/boards");
        }}
      >
        <BoardIcon />
        <div className="boardnavbar-boardtitle">
          {boardState ? "Loading..." : boardTitle}
        </div>
      </button>
      <button className="boardnavbar-btn">
        <LockIcon />
        <div className="boardnavbar-boardtitle">Private</div>
      </button>
      <button className="boardnavbar-btn">
        <TeamIcon />
        <div className="boardnavbar-boardtitle">Team Name</div>
      </button>
      <button
        className="add-user-icon"
        onClick={() => {
          showUserModal();
        }}
      >
        <AddUserIcon />
      </button>
      <CardSearchBar />
    </div>
  </ScrollContainer>
);
const mapStateToProps = (state) => {
  return {
    boardTitle: state.board.selectBoard.title,
    boardState: state.board.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: (type) => dispatch(setUserModal(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardNavBar));
