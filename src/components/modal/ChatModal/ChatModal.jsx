import React from "react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import ChatPage from "../../../pages/ChatPage/ChatPage";

import "./chatModal.css";

const ChatModal = () => {
  const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

  return (
    <div className="chat-page-modal">
      <ChatPage client={client} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(ChatModal);
