import React from "react";
import { connect } from "react-redux";
import { FaTimes } from "react-icons/fa";

import { minimizeConferenceModal, closeConferenceModal } from "../../redux";

import "./conferencePage.css";

const ConferencePage = ({
  minimizeMeeting,
  closeMeeting,
  boardId,
  user,
  boardName,
}) => {
  return (
    <div className="conference-page">
      <div className="conference-buttons">
        <button
          className="chat-minimize-btn"
          onClick={() => {
            minimizeMeeting();
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="10"
              height="2"
              transform="matrix(1 0 0 -1 3 9)"
              fill="#A0A0A0"
            ></rect>
          </svg>
        </button>
        <FaTimes
          className="meeting-close-icon"
          onClick={() => {
            closeMeeting();
          }}
        />
      </div>
      <iframe
        src="https://video-app-8228-9112-dev.twil.io/?passcode=89788682289112"
        title="Kevvlar Video Conference"
        allow="camera;microphone;display-capture;"
        width="100%"
        height="100%"
        className="meeting-iframe"
        name={`${boardId}+${user.name}+${boardName}`}
      ></iframe>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boardId: state.board.selectBoard.id,
    boardName: state.board.selectBoard.title,
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    minimizeMeeting: () => dispatch(minimizeConferenceModal()),
    closeMeeting: () => dispatch(closeConferenceModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
