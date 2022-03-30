import React from "react";
import { useChatContext } from "stream-chat-react";
import { connect } from "react-redux";

import PreviewItem from "./PreviewItem";

import { setChatNotifyInnerOff } from "../../redux";

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  channel,
  type,
  setToggleContainer,
  innerNotify,
  event,
  turnOffChatNotifyInner,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p
      className="channel-preview__item"
      onClick={() => {
        if (channel?.data?.id === event.channel_id) {
          turnOffChatNotifyInner();
        }
      }}
    >
      # {channel?.data?.id}{" "}
      <span
        style={
          innerNotify &&
          channel?.data?.id === event.channel_id &&
          event.channel_type === "team"
            ? {
                backgroundColor: "#c72c2c",
                borderRadius: "20px",
                width: "15px",
                height: "15px",
                marginLeft: "10px",
              }
            : {}
        }
      ></span>
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
    innerNotify: state.chat.innerNotify,
    event: state.chat.event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnOffChatNotifyInner: () => dispatch(setChatNotifyInnerOff()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamChannelPreview);
