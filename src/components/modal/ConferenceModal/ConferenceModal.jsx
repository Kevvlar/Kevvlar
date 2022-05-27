import React from "react";
import { connect } from "react-redux";

import ConferencePage from "../../../pages/ConferencePage/ConferencePage";

import "./conferenceModal.css";

const ConferenceModal = ({ minimizeState }) => {
  return (
    <div
      className={`${
        minimizeState ? "conference-minimize" : "conference-container"
      }`}
    >
      <ConferencePage />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    minimizeState: state.modal.minimize,
  };
};

export default connect(mapStateToProps, null)(ConferenceModal);
