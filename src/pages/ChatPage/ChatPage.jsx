import React, { useState, useEffect } from "react";
import { Chat } from "stream-chat-react";
import { connect } from "react-redux";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";

import ChannelListContainer from "../../components/Chat/ChannelListContainer";
import ChannelContainer from "../../components/Chat/ChannelContainer";

import "./chatPage.css";

const cookies = new Cookies();
const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

if (!client._user) {
  client.connectUser(
    {
      id: cookies.get("id"),
      name: cookies.get("name"),
      photo: cookies.get("photo"),
      email: cookies.get("email"),
    },
    cookies.get("chatToken")
  );
}

const ChatPage = ({ user }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
