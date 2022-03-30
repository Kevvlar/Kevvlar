import React from "react";
import { Avatar } from "stream-chat-react";
import { connect } from "react-redux";

const PreviewItem = ({ filteredUser, notify }) => {
  return (
    <div className="channel-preview__item single">
      <Avatar
        image={filteredUser?.user?.photo}
        name={filteredUser?.user?.name}
        size={24}
      />

      <p>{filteredUser?.user?.name} </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewItem);
