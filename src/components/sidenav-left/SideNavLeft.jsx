import React from "react";
import { connect } from "react-redux";

import SideNavHeader from "../sidenav-left-header/sidenav-left-header.component";
import BoardList from "../board-list/BoardList";

import "./SideNavLeft.css";

const LeftSideNav = ({ isLoading }) => {
  return (
    <nav className="sidenav-left-container">
      <SideNavHeader />
      <div className="sidenav-left-board-holder">
        <div className="sidenav-left-board-header">Boards</div>
        {isLoading ? <h2>Loading...</h2> : <BoardList />}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.board.loading,
  };
};

export default connect(mapStateToProps, null)(LeftSideNav);
