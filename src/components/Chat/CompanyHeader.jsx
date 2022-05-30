import React from "react";
import { connect } from "react-redux";

import { MinimizeIcon } from "../../assets/svg/iconlibrary";

import { closeModal, setChatNotifyOff, setIsOpen } from "../../redux";

const CompanyHeader = ({ closeModal, turnOffChatNotify, toggleOpenChat }) => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Chat</p>
      <button 
        className="chat-minimize-btn" 
        onClick={() => {
          turnOffChatNotify();
          toggleOpenChat(false);
          closeModal();
        }}>
        <MinimizeIcon />
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    turnOffChatNotify: () => dispatch(setChatNotifyOff()),
    toggleOpenChat: (bool) => dispatch(setIsOpen(bool)),
  };
};

export default connect(null, mapDispatchToProps)(CompanyHeader);
