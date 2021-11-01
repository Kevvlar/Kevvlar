import React from "react";
import { connect } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";
import { showLeftSideNav } from "../../redux/index";

import "./boardnavbar.css";

const BoardNavBar = ({ boardTitle, toggleLeftSideNav }) => (
  <ScrollContainer
      className="scroll-container boardnavbar-scroll-container"
      horizontal={true}
    >
    <div className="boardnavbar">
      <btn className="boardnavbar-btn" onClick={() => {
            toggleLeftSideNav();
          }}>
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.66683 12.6665H11.3335V2.6665H4.66683V12.6665ZM1.3335 11.3332H4.00016V3.99984H1.3335V11.3332ZM12.0002 3.99984V11.3332H14.6668V3.99984H12.0002Z" fill="#A0A0A0"/>
        </svg>
        <div className="boardnavbar-boardtitle">{boardTitle}</div>
      </btn>
      <btn className="boardnavbar-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6667 5.33333H11.9048V3.80952C11.9048 1.70667 10.1981 0 8.09524 0C5.99238 0 4.28571 1.70667 4.28571 3.80952V5.33333H3.52381C2.6819 5.33333 2 6.01524 2 6.85714V14.4762C2 15.3181 2.6819 16 3.52381 16H12.6667C13.5086 16 14.1905 15.3181 14.1905 14.4762V6.85714C14.1905 6.01524 13.5086 5.33333 12.6667 5.33333ZM8.09524 12.1905C7.25333 12.1905 6.57143 11.5086 6.57143 10.6667C6.57143 9.82476 7.25333 9.14286 8.09524 9.14286C8.93714 9.14286 9.61905 9.82476 9.61905 10.6667C9.61905 11.5086 8.93714 12.1905 8.09524 12.1905ZM10.4571 5.33333H5.73333V3.80952C5.73333 2.50667 6.79238 1.44762 8.09524 1.44762C9.3981 1.44762 10.4571 2.50667 10.4571 3.80952V5.33333Z" fill="#A0A0A0"/>
        </svg>
        <div className="boardnavbar-boardtitle">Private</div>
      </btn>
      <btn className="boardnavbar-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.6665 7.3335C11.7698 7.3335 12.6598 6.43683 12.6598 5.3335C12.6598 4.23016 11.7698 3.3335 10.6665 3.3335C9.56317 3.3335 8.6665 4.23016 8.6665 5.3335C8.6665 6.43683 9.56317 7.3335 10.6665 7.3335ZM5.33317 7.3335C6.4365 7.3335 7.3265 6.43683 7.3265 5.3335C7.3265 4.23016 6.4365 3.3335 5.33317 3.3335C4.22984 3.3335 3.33317 4.23016 3.33317 5.3335C3.33317 6.43683 4.22984 7.3335 5.33317 7.3335ZM5.33317 8.66683C3.7765 8.66683 0.666504 9.44683 0.666504 11.0002V12.6668H9.99984V11.0002C9.99984 9.44683 6.88984 8.66683 5.33317 8.66683ZM10.6665 8.66683C10.4732 8.66683 10.2565 8.68016 10.0232 8.7035C10.7965 9.26016 11.3332 10.0102 11.3332 11.0002V12.6668H15.3332V11.0002C15.3332 9.44683 12.2232 8.66683 10.6665 8.66683Z" fill="#A0A0A0"/>
        </svg>
        <div className="boardnavbar-boardtitle">Team Name</div>
      </btn>
      <btn className="add-user-icon">
        <svg width="35" height="35" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="19" cy="19" r="19" fill="#2C3136"/>
          <path d="M20.9998 18.9998C22.4732 18.9998 23.6665 17.8032 23.6665 16.3332C23.6665 14.8598 22.4732 13.6665 20.9998 13.6665C19.5265 13.6665 18.3332 14.8598 18.3332 16.3332C18.3332 17.8032 19.5265 18.9998 20.9998 18.9998ZM14.9998 17.6665V15.6665H13.6665V17.6665H11.6665V18.9998H13.6665V20.9998H14.9998V18.9998H16.9998V17.6665H14.9998ZM20.9998 20.3332C19.2232 20.3332 15.6665 21.2232 15.6665 22.9998V24.3332H26.3332V22.9998C26.3332 21.2232 22.7765 20.3332 20.9998 20.3332Z" fill="#A0A0A0"/>
        </svg>
      </btn>
    </div>
  </ScrollContainer>
);
const mapStateToProps = (state) => {
  return {
    boardTitle: state.board.currentBoardTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeftSideNav: () => dispatch(showLeftSideNav()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardNavBar);