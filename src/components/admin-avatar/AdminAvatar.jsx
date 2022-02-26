import React from "react";
import { connect } from "react-redux";

import "./adminAvatar.css";

const UserAvatar = ({ admin }) => (
  <div className="admin-avatar-container">
    <img
      className="admin-avatar-image"
      alt="img"
      src={admin?.photo}
      title={admin?.name + " (Admin)"}
    />
  </div>
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar);
