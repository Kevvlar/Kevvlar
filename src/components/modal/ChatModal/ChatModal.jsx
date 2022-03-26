import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import ChatPage from "../../../pages/ChatPage/ChatPage";

import "./chatModal.css";

const ChatModal = ({ user }) => {
  useEffect(() => {
    const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

    const newNotification = client.on("message.new", (event) => {
      console.log("New message alert");
    });

    return () => {
      newNotification.unsubscribe();
    };
  }, []);

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

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
