import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import { connect } from "react-redux";

import { removeEvent } from "../../redux";

const PreviewItem = ({ filteredUser, events, removeChannelNotify }) => {
  const { client } = useChatContext();

  return (
    <div
      className="channel-preview__item single"
      onClick={() => {
        removeChannelNotify(filteredUser.user.name);
      }}
    >
      <span style={{ position: "relative" }}>
        <Avatar
          image={filteredUser?.user?.photo}
          name={filteredUser?.user?.name}
          size={24}
        />

        <div
          style={
            filteredUser.user.online
              ? {
                  backgroundColor: "#3BA55D",
                  borderRadius: "20px",
                  width: "8px",
                  height: "8px",
                  position: "absolute",
                  left: "15px",
                  bottom: "0",
                }
              : {}
          }
        ></div>
      </span>
      <p>{filteredUser?.user?.name}</p>
      <span
        style={
          events.includes(filteredUser.user.name)
            ? {
                backgroundColor: "#03a9f4",
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
