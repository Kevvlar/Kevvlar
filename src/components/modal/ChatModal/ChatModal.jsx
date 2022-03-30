import React from "react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import ChatPage from "../../../pages/ChatPage/ChatPage";
import { setChatNotifyOn } from "../../../redux";

import "./chatModal.css";

const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

class ChatModal extends React.Component {
  componentDidMount() {
    this.newNotification = client.on("message.new", (event) => {
      if (event.user.id !== this.props.user._id) {
        this.props.turnChatNotificationOn(event);
      }
      console.log(event);
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnChatNotificationOn: (data) => dispatch(setChatNotifyOn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
