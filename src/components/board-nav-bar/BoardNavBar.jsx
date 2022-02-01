import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CardSearchBar from "../../components/CardSearchBar/CardSearchBar";
import UserAvatar from "../user-avatar/UserAvatar";
import AdminAvatar from "../admin-avatar/AdminAvatar";

import { setUserModal, clearColumns, fetchActivities } from "../../redux";

import {
  LockIcon,
  BoardIcon,
  TeamIcon,
  AddUserIcon,
  FileshareIcon,
  ActivityIcon,
} from "../../assets/svg/iconlibrary";

import "./boardnavbar.css";

const BoardNavBar = ({
  board,
  history,
  showUserModal,
  emptyColumns,
  user,
  getActivities,
  activities,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleActivityMenu = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const ActivityMenu = () => (
    <div>
      <div className="activity-close-wrapper" onClick={handleActivityMenu}></div>
      <div className="activity-profile-menu">
        <div className="activity-main-title">Activity</div>
        <div className="activity-item-wrapper">
          {activities.map((activity) => (
            <div className="activity-item-holder" key={activity._id}>
              <div className="activity-info-holder">
                <div className="activity-user-name">{activity.info.user}&nbsp;</div>
                <div className="activity-helper-text">{activity.info.title}&nbsp;</div> 
                <div className="activity-assigned-user">{activity.info.userAssigned}&nbsp;</div>
                <div className="activity-card-title">{activity.info.cardTitle}&nbsp;</div>
              </div>
              <div className="task-item-board">
                {activity.info.date} at {activity.info.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
        {board.members.length > 2 ? (
          <div
            className="avatar-more"
            title={board.members.slice(2).map((member) => member.name)}
          >
            {"+" + (board.members.length - 2)}
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
            getActivities(user.token, board.id);
            handleActivityMenu();
          }}
        >
          <ActivityIcon />
          <div className="boardnavbar-boardtitle">Activity</div>
          {showMenu ? <ActivityMenu /> : null}
        </button>
        <button className="boardnavbar-btn">
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
    showUserModal: (type) => dispatch(setUserModal(type)),
    emptyColumns: () => dispatch(clearColumns()),
    getActivities: (token, boardId) =>
      dispatch(fetchActivities(token, boardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardNavBar));
