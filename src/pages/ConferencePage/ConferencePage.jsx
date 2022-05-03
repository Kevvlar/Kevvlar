import React from "react";
import { connect } from "react-redux";
import { FaTimes } from "react-icons/fa";

import { minimizeConferenceModal, closeConferenceModal } from "../../redux";

import "./conferencePage.css";

const ConferencePage = ({ minimizeMeeting, closeMeeting }) => {
  return (
    <div className="conference-page">
      <div className="conference-buttons">
        <button 
          class="chat-minimize-btn" 
          onClick={() => {
            minimizeMeeting();
          }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="10" height="2" transform="matrix(1 0 0 -1 3 9)" fill="#A0A0A0"></rect>
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
        src="https://video-app-4088-3712-dev.twil.io/?passcode=60809940883712"
        title="Kevvlar Video Conference"
        allow="camera;microphone;display-capture;"
        width="100%"
        height="100%"
        className="meeting-iframe"
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    minimizeMeeting: () => dispatch(minimizeConferenceModal()),
    closeMeeting: () => dispatch(closeConferenceModal()),
  };
};

export default connect(null, mapDispatchToProps)(ConferencePage);
