import React from "react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import { setChatModal, setChatNotifyOff } from "../../redux";

import "./chatButton.css";

const ChatButton = ({ showChatModal, user, turnOffChatNotify, notify }) => {
  return (
    <div className="chat-button-container">
      <button
        className="chat-button"
        onClick={() => {
          const client = StreamChat.getInstance(
            process.env.REACT_APP_STREAM_API_KEY
          );

          client.connectUser(
            {
              id: user._id,
              name: user.name,
              photo: user.photo,
              email: user.email,
            },
            user.chatToken
          );

          turnOffChatNotify();
          showChatModal();
        }}
      >
        Chat
        <div
          style={
            notify
              ? {
                  backgroundColor: "#03A9F4",
                  borderRadius: "20px",
                  width: "10px",
                  height: "10px",
                  position: "fixed",
                  right: "15px",
                  bottom: "35px",
                }
              : {}
          }
        ></div>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    notify: state.chat.notify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showChatModal: () => dispatch(setChatModal()),
    turnOffChatNotify: () => dispatch(setChatNotifyOff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatButton);
