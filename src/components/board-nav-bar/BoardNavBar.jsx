import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";
import UserAvatar from "../user-avatar/UserAvatar";
import AdminAvatar from "../admin-avatar/AdminAvatar";

import socket from "../../Socket";
import { setUserModal, clearColumns } from "../../redux";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
  FileshareIcon,
  ActivityIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({ board, history, showUserModal, emptyColumns, user }) => (
  <div className="boardnavbar">
    <div className="boardnavbar-group">
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
      {board.admins.map((admin, index) => (
        <AdminAvatar key={index} admin={admin} />
      ))}
      {board.members.slice(0, 2).map((member, index) => (
        <UserAvatar key={index} user={member} />
      ))}
      {(board.members.length > 2) ? <div className="avatar-more" title={board.members.slice(2).map((member) => (member.name))}>{("+" + (board.members.length - 2))}</div> : null}
      <button
        className="add-user-icon"
        onClick={() => {
          showUserModal();
        }}
      >
        <AddUserIcon />
      </button>
    </div>
    <div className="boardnavbar-group">
      <CardSearchBar />
      <button className="boardnavbar-btn">
        <ActivityIcon />
        <div className="boardnavbar-boardtitle">Activity</div>
      </button>
      <button className="boardnavbar-btn">
        <FileshareIcon />
        <div className="boardnavbar-boardtitle">Files</div>
      </button>
    </div>
  </div>
);
const mapStateToProps = (state) => {
  return {
    board: state.board.selectBoard,
    boardState: state.board.loading,
    user: state.user.userData,
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
