import React from "react";
import { Avatar } from "stream-chat-react";
import { connect } from "react-redux";

import { setChatNotifyInnerOff } from "../../redux";

const PreviewItem = ({
  filteredUser,
  innerNotify,
  event,
  turnOffChatNotifyInner,
}) => {
  return (
    <div
      className="channel-preview__item single"
      onClick={() => {
        if (filteredUser?.user?.id === event.user.id) {
          turnOffChatNotifyInner();
        }
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
          innerNotify &&
          filteredUser?.user?.id === event.user.id &&
          event.channel_type === "messaging"
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewItem);
