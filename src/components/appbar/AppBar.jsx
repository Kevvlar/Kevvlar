import React from "react";
import { connect } from "react-redux";

import NotificationIcon from "../notification-icon/NotificationIcon";
import UserProfile from "../profile-image/ProfileImage";
import { HomeIcon } from "../../assets/svg/iconlibrary";
import { withRouter } from "react-router";

import { clearColumns, resetIsMe, clearCardSearchKey } from "../../redux";
import { KevvlarLogo } from "../../assets/svg/iconlibrary";

import "./appbar.css";
import "./kevvlar-logo.svg";

const AppBar = ({ history, emptyColumns, clearIsMe, clearCardSearch }) => (
  <div className="appbar-container">
    <div className="appbar-menu-container">
      <div className="appbar-ham-icon-container">
        <button
          className="appbar-logo"
          onClick={() => {
            clearCardSearch();
            clearIsMe();
            emptyColumns();
            history.push("/boards");
          }}
        >
          <HomeIcon />
        </button>
        <div className="appbar-logo primary-text-color">
          <KevvlarLogo />
        </div>
      </div>
    </div>
    <div className="appbar-user-menu-container">
      <NotificationIcon />
      <UserProfile />
    </div>
  </div>
);
const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
    boardState: state.board.loading,
    boardId: state.board.selectBoard.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyColumns: () => dispatch(clearColumns()),
    clearIsMe: () => dispatch(resetIsMe()),
    clearCardSearch: () => dispatch(clearCardSearchKey()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppBar));
