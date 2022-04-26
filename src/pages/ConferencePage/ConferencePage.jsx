import React from "react";
import { connect } from "react-redux";

import { minimizeConferenceModal, closeConferenceModal } from "../../redux";

import "./conferencePage.css";

const ConferencePage = ({ minimizeMeeting, closeMeeting }) => {
  return (
    <div className="conference-page">
      <p>Video Conference Page</p>
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
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    minimizeMeeting: () => dispatch(minimizeConferenceModal()),
    closeMeeting: () => dispatch(closeConferenceModal()),
  };
};

export default connect(null, mapDispatchToProps)(ConferencePage);
