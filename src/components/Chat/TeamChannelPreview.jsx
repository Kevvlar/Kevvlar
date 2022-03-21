import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  channel,
  type,
  setToggleContainer,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <p className="channel-preview__item">
      # {channel?.data?.name || channel?.data?.id}
    </p>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members);
    const filteredUsers = members.filter(
      (user) => user.user_id !== client.userID
    );

    return (
      <>
        {filteredUsers.map((filteredUser, index) => (
          <div key={index} className="channel-preview__item single">
            <Avatar
              image={filteredUser?.user?.photo}
              name={filteredUser?.user?.name}
              size={24}
            />
            <p>{filteredUser?.user?.name}</p>
          </div>
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

export default TeamChannelPreview;
