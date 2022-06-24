import React from "react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import ChatPage from "../../../pages/ChatPage/ChatPage";
import { setChatNotifyOn } from "../../../redux";

import audio from "../../../assets/sound/chat-notification.wav";

import "./chatModal.css";

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

const notifySound = new Audio(audio);

class ChatModal extends React.Component {
  componentDidMount() {
    this.newNotification = client.on("message.new", (event) => {
      if (event.user.id !== this.props.user._id) {
        if (event.channel_type === "team") {
          notifySound.play();
          this.props.turnChatNotificationOn(event.channel_id);
        }

        if (event.channel_type === "messaging") {
          notifySound.play();
          this.props.turnChatNotificationOn(event.user.name);
        }
      }
    });
  }

  componentWillUnmount() {
    this.newNotification.unsubscribe();
  }

  render() {
    return (
      <div className="chat-page-modal">
        <ChatPage />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    isOpen: state.chat.isOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnChatNotificationOn: (data) => dispatch(setChatNotifyOn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
