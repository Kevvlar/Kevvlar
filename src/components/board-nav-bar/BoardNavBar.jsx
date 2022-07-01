import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";
import UserAvatar from "../user-avatar/UserAvatar";
import AdminAvatar from "../admin-avatar/AdminAvatar";
import { AiFillCalendar } from "react-icons/ai";

import {
  setUserModal,
  setCalendarModal,
  clearColumns,
  toggleActivity,
  toggleFileModal,
  fetchFiles,
  toggleAssignedMe,
  resetIsMe,
  clearCardSearchKey,
  setConferenceModal,
} from "../../redux";

import { CONFERENCE_MODAL } from "../../redux/modal/modalTypes";

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
  showCalendar,
  emptyColumns,
  user,
  showActivity,
  showFile,
  getFiles,
  startMeeting,
  sortByMe,
  clearIsMe,
  isMe,
  clearCardSearch,
  modalType,
}) => {
  return (
    <div className="boardnavbar">
      <div className="boardnavbar-group">
        <button
          className="boardnavbar-btn"
          onClick={() => {
            clearCardSearch();
            clearIsMe();
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
        <div className="assigned-to-me-holder">
          <label className="switch">
            <input
              type="checkbox"
              onClick={() => {
                clearCardSearch();
                sortByMe();
              }}
              readOnly
              checked={isMe}
            />
            <span className="slider round"></span>
          </label>
          <div className="assigned-title">Assigned To Me</div>
        </div>
        {modalType !== CONFERENCE_MODAL && (
          <button
            className="boardnavbar-btn"
            onClick={() => {
              startMeeting();
            }}
          >
            <MeetingIcon />
            <div className="boardnavbar-boardtitle">Meeting</div>
          </button>
        )}
        <button
          className="boardnavbar-btn"
          onClick={() => {
            showCalendar();
          }}
        >
          <AiFillCalendar />
          <div className="boardnavbar-boardtitle">Calendar</div>
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
    isMe: state.column.isMe,
    modalType: state.modal.conference,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showUserModal: (type) => dispatch(setUserModal(type)),
    emptyColumns: () => dispatch(clearColumns()),
    showActivity: () => dispatch(toggleActivity()),
    showCalendar: () => dispatch(setCalendarModal()),
    showFile: () => dispatch(toggleFileModal()),
    getFiles: (token, boardId) => dispatch(fetchFiles(token, boardId)),
    startMeeting: () => dispatch(setConferenceModal()),
    sortByMe: () => dispatch(toggleAssignedMe()),
    clearIsMe: () => dispatch(resetIsMe()),
    clearCardSearch: () => dispatch(clearCardSearchKey()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardNavBar));
