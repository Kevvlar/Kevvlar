import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({ boardTitle, history, boardState }) => (
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
        <div className="boardnavbar-boardtitle">{boardTitle}</div>
      </button>
      <button className="boardnavbar-btn">
        <LockIcon />
        <div className="boardnavbar-boardtitle">Private</div>
      </button>
      <button className="boardnavbar-btn">
        <TeamIcon />
        <div className="boardnavbar-boardtitle">Team Name</div>
      </button>
      <button className="add-user-icon">
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

export default connect(mapStateToProps, null)(withRouter(BoardNavBar));
