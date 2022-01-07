import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./profileImage.css";

import {
  handleLogOutUser,
  clearBoards,
  clearColumns,
} from "../../redux/index.js";

const UserProfile = ({ 
  user,
  logUserOut,
  history,
  emptyBoards,
  emptyColumns, }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleUserMenu = () => {
    setShowMenu(showMenu => !showMenu);
  }

  const UserMenu = () => (
    <div>
      <div className="close-wrapper" onClick={handleUserMenu}></div>
      <div className="user-profile-menu">
        <img className="user-profile-menu-image" alt="img" src={user.photo} />
        <div className="user-profile-menu-name">{user.name}</div>
        <div className="user-profile-email">{user.email}</div>
        <div onClick={handleSignOut} className="user-profile-logout">
          <div className="user-profile-logout-text">Log out</div>
        </div>
      </div>
    </div>
  );

  const handleSignOut = () => {
    emptyBoards();
    emptyColumns();
    logUserOut(history);
  };

  return(
    <div className="user-profile-container">
      <img className="user-profile-image" alt="img" src={user.photo} onClick={handleUserMenu} />
      <div className="user-profile-name" onClick={handleUserMenu}>{user.name}</div>
      {showMenu ? <UserMenu /> : null}
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logUserOut: (history) => dispatch(handleLogOutUser(history)),
    emptyBoards: () => dispatch(clearBoards()),
    emptyColumns: () => dispatch(clearColumns()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(withRouter(UserProfile));
