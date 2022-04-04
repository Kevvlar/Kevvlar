import React from "react";
import { Avatar } from "stream-chat-react";
import { connect } from "react-redux";

import { removeEvent } from "../../redux";

const PreviewItem = ({ filteredUser, events, removeChannelNotify }) => {
  return (
    <div
      className="channel-preview__item single"
      onClick={() => {
        removeChannelNotify(filteredUser.user.name);
      }}
    >
      <Avatar
        image={filteredUser?.user?.photo}
        name={filteredUser?.user?.name}
        size={24}
      />
      <p>{filteredUser?.user?.name}</p>
      <span
        style={
          events.includes(filteredUser.user.name)
            ? {
                backgroundColor: "#e54343",
                borderRadius: "20px",
                width: "8px",
                height: "8px",
                marginLeft: "10px",
              }
            : {}
        }
      ></span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    events: state.chat.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeChannelNotify: (eventName) => dispatch(removeEvent(eventName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewItem);
