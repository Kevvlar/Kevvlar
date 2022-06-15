import React from "react";
import { useChatContext } from "stream-chat-react";
import { connect } from "react-redux";

import PreviewItem from "./PreviewItem";

import { removeEvent } from "../../redux";

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  channel,
  type,
  setToggleContainer,
  events,
  removeChannelNotify,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p
      className="channel-preview__item"
      onClick={() => {
        removeChannelNotify(channel.data.id);
      }}
    >
      # {channel?.data?.id}{" "}
      <span
        style={
          events.includes(channel.data.id)
            ? {
                backgroundColor: "#e54343",
                borderRadius: "20px",
                width: "8px",
                height: "8px",
                marginLeft: "10px",
              }
            : {}
        }
      >
        {/* {console.lof(activeChannel)} */}
      </span>
    </p>
  );

  // channel?.data?.name

  const DirectPreview = () => {
    const members = Object.values(channel.state.members);
    const filteredUsers = members.filter(
      (user) => user.user_id !== client.userID
    );

    return (
      <>
        {filteredUsers.map((filteredUser, index) => (
          <PreviewItem key={index} filteredUser={filteredUser} />
        ))}
      </>
    );
  };

  return (
    <div
      className={
        channel?.id === activeChannel?.id
          ? "channel-preview__wrapper_selected"
          : "channel-preview__wrapper"
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamChannelPreview);
