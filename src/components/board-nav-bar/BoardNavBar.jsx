import React from "react";
import { connect } from "react-redux";

import "./boardnavbar.css";

const BoardNavBar = ({ boardTitle }) => (
  <div className="boardnavbar">
    <btn className="boardnavbar-btn">
      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.66683 12.6665H11.3335V2.6665H4.66683V12.6665ZM1.3335 11.3332H4.00016V3.99984H1.3335V11.3332ZM12.0002 3.99984V11.3332H14.6668V3.99984H12.0002Z" fill="#A0A0A0"/>
      </svg>
      <div className="boardnavbar-boardtitle">{boardTitle}</div>
    </btn>
  </div>
);
const mapStateToProps = (state) => {
  return {
    boardTitle: state.board.currentBoardTitle,
  };
};

export default connect(mapStateToProps)(BoardNavBar);