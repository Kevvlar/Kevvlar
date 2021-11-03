import React from "react";
import { connect } from "react-redux";
import { FaBars } from "react-icons/fa";

import { hideLeftSideNav } from "../../redux/index";

import "./sidenav-left-header.styles.css";

const LeftSideNavHeader = ({ unToogleSideNav }) => (
  <div className="sidenav-left-header-container">
    <div className="sidenav-left-header-ham-icon-container">
      <FaBars onClick={() => unToogleSideNav()} />
    </div>
    <div className="sidenav-left-exit-wrapper" onClick={() => unToogleSideNav()}></div>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    unToogleSideNav: () => dispatch(hideLeftSideNav()),
  };
};

export default connect(null, mapDispatchToProps)(LeftSideNavHeader);
