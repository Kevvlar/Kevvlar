import React from "react";
import { FaBell } from "react-icons/fa";
import { connect } from "react-redux";

import socket from "../../Socket";
import { toggleRightSideNav, turnOffNotify } from "../../redux/index";

import "./notificationIcon.css";

class NotificationIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotified: false,
    };
  }

  componentDidMount() {
    socket.on("getNotification", () => {
      this.setState({ isNotified: true });
    });

    socket.on("turnOffFlag", () => {
      this.props.notifyOff(false);
    });
  }

  render() {
    return (
      <div className="notification-icon-container">
        <FaBell
          onClick={() => {
            socket.emit("turnOffNotify", this.props.user._id);
            this.props.toggleRightSideNav();
            this.setState({ isNotified: false });
          }}
          className="notification-icon"
        />
        <span
          style={
            this.state.isNotified || this.props.user.isNotified
              ? {
                  backgroundColor: "#03A9F4",
                  borderRadius: "20px",
                  width: "10px",
                  height: "10px",
                }
              : null
          }
        ></span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
    notifyOff: (bool) => dispatch(turnOffNotify(bool)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon);
