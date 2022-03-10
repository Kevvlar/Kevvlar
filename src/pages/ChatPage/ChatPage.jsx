import React from "react";
import { connect } from "react-redux";

import "./chatPage.css";

const ChatPage = ({ user }) => {
  return (
    <div className="chat-page-container">
      <div className="chat-main">
        <div className="chat-header">
          <h4># {"  "}Kevvlar</h4>
          <h4>Join voice</h4>
        </div>
        <div className="chat-area">
          <h4>Chat Main</h4>
        </div>
        <div className="chat-input">
          <h4>Chat Input</h4>
        </div>
      </div>
      <div className="chat-channel-messages">
        <div className="channel-list">
          <h4>Channel List</h4>
        </div>
        <div className="direct-message-list">
          <h4>Direct Messages</h4>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};
export default connect(mapStateToProps, null)(ChatPage);
