import React, { useState } from "react";
import { connect } from "react-redux";

import ConferencePage from "../../../pages/ConferencePage/ConferencePage";

import "./conferenceModal.css";

const ConferenceModal = ({ minimizeState }) => {
  const [anchor, setAnchor] = useState("left");

  return (
    <div
      className={`${
        minimizeState
          ? `conference-minimize ${
              anchor === "left"
                ? "conference-anchor-left"
                : "conference-anchor-right"
            }`
          : "conference-container"
      }`}
    >
      <ConferencePage setAnchor={setAnchor} anchor={anchor} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    minimizeState: state.modal.minimize,
  };
};

export default connect(mapStateToProps, null)(ConferenceModal);
