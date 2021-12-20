import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";
import ProfileImage from "../profile-image/ProfileImage";

import { setUserModal } from "../../redux";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({ boardTitle, history, boardState, showUserModal }) => (
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
    <ProfileImage />
    <ProfileImage />
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
