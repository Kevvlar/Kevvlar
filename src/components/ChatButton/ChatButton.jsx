import React from "react";
import { connect } from "react-redux";
import { ChatIcon } from "../../assets/svg/iconlibrary";

import { setChatModal, setChatNotifyOff, setIsOpen } from "../../redux";

import "./chatButton.css";

const ChatButton = ({
  showChatModal,
  user,
  turnOffChatNotify,
  notify,
  toggleOpenChat,
  isOpen,
}) => {
  return (
    <div className="chat-button-container">
      <button
        className="chat-button"
        onClick={() => {
          turnOffChatNotify();
          toggleOpenChat(true);
          showChatModal();
        }}
      >
        <ChatIcon />
        <div
          style={
            notify && isOpen !== true
              ? {
                  backgroundColor: "#03a9f4",
                  borderRadius: "20px",
                  width: "15px",
                  height: "15px",
                  position: "fixed",
                  right: "13px",
                  bottom: "34px",
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
    isOpen: state.chat.isOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showChatModal: () => dispatch(setChatModal()),
    turnOffChatNotify: () => dispatch(setChatNotifyOff()),
    toggleOpenChat: (bool) => dispatch(setIsOpen(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatButton);
