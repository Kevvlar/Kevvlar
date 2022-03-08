import React from "react";
import { connect } from "react-redux";

import { setChatModal } from "../../redux";

import "./chatButton.css";

const ChatButton = ({ showChatModal }) => {
  return (
    <div className="chat-button-container">
      <button className="chat-button" onClick={() => showChatModal()}>
        Chat
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showChatModal: () => dispatch(setChatModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatButton);
