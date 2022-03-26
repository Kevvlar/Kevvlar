import React from "react";
import { connect } from "react-redux";

import { MinimizeIcon } from "../../assets/svg/iconlibrary";

import { closeModal, setChatNotifyOff } from "../../redux";

const CompanyHeader = ({ closeModal, turnOffChatNotify }) => {
  return (
    <div className="channel-list__header">
      <p className="channel-list__header__text">Chat</p>
      <button className="chat-minimize-btn">
        <MinimizeIcon
          closeChat={() => {
            turnOffChatNotify();
            closeModal();
          }}
        />
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    turnOffChatNotify: () => dispatch(setChatNotifyOff()),
  };
};

export default connect(null, mapDispatchToProps)(CompanyHeader);
