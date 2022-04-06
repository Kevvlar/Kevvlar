import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";
import UserAvatar from "../user-avatar/UserAvatar";
import AdminAvatar from "../admin-avatar/AdminAvatar";

import {
  setUserModal,
  setMeetingModal,
  clearColumns,
  toggleActivity,
  toggleFileModal,
  fetchFiles,
} from "../../redux";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
  FileshareIcon,
  ActivityIcon,
  MeetingIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({
  board,
  history,
  showUserModal,
  showMeetingModal,
  emptyColumns,
  user,
  showActivity,
  showFile,
  getFiles,
}) => {
  return (
    <div className="boardnavbar">
      <div className="boardnavbar-group">
        <button
          className="boardnavbar-btn"
          onClick={() => {
            emptyColumns();
            history.push("/boards");
          }}
        >
          <BoardIcon />
          <div className="boardnavbar-boardtitle">{board?.title}</div>
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
        {board?.members?.length > 2 ? (
          <div
            className="avatar-more"
            title={board?.members?.slice(2).map((member) => member.name)}
          >
            {"+" + (board?.members?.length - 2)}
          </div>
        ) : null}
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
        <button
          className="boardnavbar-btn"
          onClick={() => {
            showMeetingModal();
          }}
        >
          <MeetingIcon />
          <div className="boardnavbar-boardtitle">Meeting</div>
        </button>
        <button
          className="boardnavbar-btn"
          onClick={() => {
            showActivity();
          }}
        >
          <ActivityIcon />
          <div className="boardnavbar-boardtitle">Activity</div>
        </button>
        <button
          onClick={() => {
            showFile();
            getFiles(user.token, board.id);
          }}
          className="boardnavbar-btn"
        >
          <FileshareIcon />
          <div className="boardnavbar-boardtitle">Files</div>
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    board: state.board.selectBoard,
    boardState: state.board.loading,
    user: state.user.userData,
    activities: state.column.activities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: () => dispatch(setUserModal()),
    showMeetingModal: () => dispatch(setMeetingModal()),
    emptyColumns: () => dispatch(clearColumns()),
    showActivity: () => dispatch(toggleActivity()),
    showFile: () => dispatch(toggleFileModal()),
    getFiles: (token, boardId) => dispatch(fetchFiles(token, boardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardNavBar));
