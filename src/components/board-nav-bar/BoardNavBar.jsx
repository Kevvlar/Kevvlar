import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ScrollContainer from "react-indiana-drag-scroll";
import { showLeftSideNav } from "../../redux/index";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({ boardTitle, toggleLeftSideNav, history }) => (
  <ScrollContainer
    className="scroll-container boardnavbar-scroll-container"
    horizontal={true}
  >
    <div className="boardnavbar">
      <button
        className="boardnavbar-btn"
        onClick={() => {
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
    boardTitle: state.board.selectBoardTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeftSideNav: () => dispatch(showLeftSideNav()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardNavBar));
