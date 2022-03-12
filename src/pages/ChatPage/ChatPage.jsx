import React, { useState } from "react";
import { Chat } from "stream-chat-react";
import { connect } from "react-redux";

import ChannelListContainer from "../../components/Chat/ChannelListContainer";
import ChannelContainer from "../../components/Chat/ChannelContainer";

import "./chatPage.css";

const ChatPage = ({ client, user }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  client.connectUser(
    {
      id: user._id,
      name: user.name,
      photo: user.photo,
      email: user.email,
    },
    user.chatToken
  );

  return (
    <div className="chat-page-container">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(ChatPage);
