import React from "react";
import { connect } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { FullscreenIcon, Minimize } from "../../assets/svg/iconlibrary";

import { closeConferenceModal, toggleMinimize } from "../../redux";

import "./conferencePage.css";

const ConferencePage = ({
  boardId,
  user,
  boardName,
  closeConferenceModal,
  minimize,
  miniMizeState,
}) => {
  return (
    <div className={`conference-page`} style={{ width: "90%", height: "90%" }}>
      <div className="conference-buttons">
        <button
          className="chat-minimize-btn"
          onClick={() => {
            minimize();
          }}
        >
          {miniMizeState ? <FullscreenIcon /> : <Minimize />}
        </button>
        <FaTimes
          className="meeting-close-icon"
          onClick={() => {
            closeConferenceModal();
          }}
        />
      </div>
      <iframe
        src="https://video-app-0719-7968-dev.twil.io?passcode=24527607197968"
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
    miniMizeState: state.modal.minimize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeConferenceModal: () => dispatch(closeConferenceModal()),
    minimize: () => dispatch(toggleMinimize()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConferencePage);
