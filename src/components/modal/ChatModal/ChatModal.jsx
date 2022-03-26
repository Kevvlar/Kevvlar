import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import ChatPage from "../../../pages/ChatPage/ChatPage";
import { setChatNotifyOn } from "../../../redux";

import "./chatModal.css";

const ChatModal = ({ user, turnChatNotificationOn }) => {
  useEffect(() => {
    const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

    const newNotification = client.on("message.new", (event) => {
      turnChatNotificationOn();
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
  return {
    turnChatNotificationOn: () => dispatch(setChatNotifyOn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
