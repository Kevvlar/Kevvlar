import React, { useState } from "react";
import { Chat } from "stream-chat-react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";

import ChannelListContainer from "../../components/Chat/ChannelListContainer";
import ChannelContainer from "../../components/Chat/ChannelContainer";

import "./chatPage.css";

const ChatPage = ({ user }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

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
