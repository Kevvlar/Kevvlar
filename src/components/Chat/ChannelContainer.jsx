import React from "react";
import {
  Avatar,
  Channel,
  MessageTeam,
  useChatContext,
} from "stream-chat-react";

import ChannelInner from "./ChannelInner";
import CreateChannel from "./CreateChannel";
import EditChannel from "./EditChannel";

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  const { client } = useChatContext();

  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history.
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className=" channel__container">
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
        Avatar={() => <Avatar image={client._user.photo} size={30} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;
