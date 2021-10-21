import React from "react";
import { connect } from "react-redux";
import { FaBars } from "react-icons/fa";

import { showLeftSideNav } from "../../redux/index";

import NotificationIcon from "../notification-icon/NotificationIcon";
import UserProfile from "../profile-image/ProfileImage";

import "./appbar.css";
import "./kevvlar-logo.svg";

const AppBar = ({ toggleLeftSideNav, boardTitle }) => (
  <header>
    <div className="appbar-container">
      <div className="appbar-menu-container">
        <div
          onClick={() => {
            toggleLeftSideNav();
          }}
          className="appbar-ham-icon-container"
        >
          <FaBars className="appbar-ham-icon" />
        </div>
        <p className="appbar-input">{boardTitle}</p>
      </div>
      <div className="appbar-logo primary-text-color">
        <svg
          width="120"
          height="38"
          viewBox="0 0 178 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.2205 20.875L44.783 23.5V30H40.0955V7.25H44.783V17.5625L46.8455 14.7344L52.6423 7.25H58.408L50.3298 17.3594L58.6423 30H53.0642L47.2205 20.875ZM74.0955 20.1406H65.0955V26.2344H75.658V30H60.408V7.25H75.6267V11.0469H65.0955V16.4688H74.0955V20.1406ZM86.8142 24.3594L91.9705 7.25H97.1892L89.2673 30H84.3767L76.4861 7.25H81.6892L86.8142 24.3594ZM107.752 24.3594L112.908 7.25H118.127L110.205 30H105.314L97.4236 7.25H102.627L107.752 24.3594ZM124.97 26.2344H134.924V30H120.283V7.25H124.97V26.2344ZM150.783 25.3125H142.564L141.002 30H136.017L144.486 7.25H148.83L157.345 30H152.361L150.783 25.3125ZM143.83 21.5156H149.517L146.658 13L143.83 21.5156ZM167.892 21.6719H164.158V30H159.47V7.25H167.924C170.611 7.25 172.684 7.84896 174.142 9.04688C175.601 10.2448 176.33 11.9375 176.33 14.125C176.33 15.6771 175.991 16.974 175.314 18.0156C174.648 19.0469 173.632 19.8698 172.267 20.4844L177.189 29.7812V30H172.158L167.892 21.6719ZM164.158 17.875H167.939C169.116 17.875 170.028 17.5781 170.674 16.9844C171.319 16.3802 171.642 15.5521 171.642 14.5C171.642 13.4271 171.335 12.5833 170.72 11.9688C170.116 11.3542 169.184 11.0469 167.924 11.0469H164.158V17.875Z"
            fill="#EBEBEB"
          />
          <rect
            x="8.48511"
            y="27.4854"
            width="12"
            height="12"
            transform="rotate(-45 8.48511 27.4854)"
            fill="#47B98F"
          />
          <path
            d="M0 19L8.48528 10.5147L16.9706 19L8.48528 27.4853L0 19Z"
            fill="#E27561"
          />
          <rect
            x="8.48511"
            y="10.5146"
            width="12"
            height="12"
            transform="rotate(-45 8.48511 10.5146)"
            fill="#03A9F4"
          />
        </svg>
      </div>
      <div className="appbar-user-menu-container">
        <NotificationIcon />
        <UserProfile />
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
    boardTitle: state.board.currentBoardTitle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLeftSideNav: () => dispatch(showLeftSideNav()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
