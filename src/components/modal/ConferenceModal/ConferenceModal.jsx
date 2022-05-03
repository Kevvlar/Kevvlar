import React from "react";

import ConferencePage from "../../../pages/ConferencePage/ConferencePage";

import "./conferenceModal.css";

const conferenceModal = () => {
  return (
    <div className="modal-wrapper">
      <div className="conference-modal">
        <ConferencePage />
      </div>
    </div>
  );
};

export default conferenceModal;
