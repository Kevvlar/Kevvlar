import React from "react";

import "./meetingModal.css";

const MeetingModal = () => {
  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <div className="modal-body">
          <h2 className="modal-title">Meeting</h2>
          <p>Meeting info goes here...</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
