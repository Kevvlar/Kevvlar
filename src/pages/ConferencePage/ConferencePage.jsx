import React from "react";
import { connect } from "react-redux";

import { minimizeConferenceModal, closeConferenceModal } from "../../redux";

import "./conferencePage.css";

const ConferencePage = ({ minimizeMeeting, closeMeeting }) => {
  return (
    <div className="conference-page">
      <iframe
        src="https://video-app-4088-3712-dev.twil.io/?passcode=60809940883712"
        title="Kevvlar Video Conference"
        allow="camera;microphone;display-capture;"
        width="100%"
        height="100%"
      />
      <div className="conference-buttons">
        <button
          onClick={() => {
            minimizeMeeting();
          }}
        >
          Minimize
        </button>
        <button
          onClick={() => {
            closeMeeting();
          }}
        >
          Leave
        </button>
      </div>
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
