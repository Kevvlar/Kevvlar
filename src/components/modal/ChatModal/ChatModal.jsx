import React from "react";
import { connect } from "react-redux";

import ChatPage from "../../../pages/ChatPage/ChatPage";

import "./chatModal.css";

const ChatModal = () => {
  return (
    <div className="chat-page-modal">
      <ChatPage />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(ChatModal);
