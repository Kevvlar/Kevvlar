import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";
import UserAvatar from "../user-avatar/UserAvatar";

import socket from "../../Socket";
import { setUserModal, clearColumns } from "../../redux";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({ board, history, showUserModal, emptyColumns }) => (
  <div className="boardnavbar">
    <button
      className="boardnavbar-btn"
      onClick={() => {
        socket.disconnect();
        emptyColumns();
        history.push("/boards");
      }}
    >
      <BoardIcon />
      <div className="boardnavbar-boardtitle">{board.title}</div>
    </button>
    <button className="boardnavbar-btn">
      <LockIcon />
      <div className="boardnavbar-boardtitle">Private</div>
    </button>
    <button className="boardnavbar-btn">
      <TeamIcon />
      <div className="boardnavbar-boardtitle">Team Name</div>
    </button>
    {board.members.map((member) => (
      <UserAvatar key={member._id} user={member} />
    ))}
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
    board: state.board.selectBoard,
    boardState: state.board.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: (type) => dispatch(setUserModal(type)),
    emptyColumns: () => dispatch(clearColumns()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardNavBar));
