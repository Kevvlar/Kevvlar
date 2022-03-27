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
                  backgroundColor: "#c72c2c",
                  borderRadius: "20px",
                  width: "15px",
                  height: "15px",
                  position: "fixed",
                  right: "13px",
                  bottom: "29px",
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
