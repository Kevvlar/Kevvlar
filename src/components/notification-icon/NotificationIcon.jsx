import React from "react";
import { FaBell } from "react-icons/fa";
import { connect } from "react-redux";

import socket from "../../Socket";
import { toggleRightSideNav } from "../../redux/index";

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
  }

  render() {
    return (
      <div className="notification-icon-container">
        <FaBell
          onClick={() => [this.props.toggleRightSideNav(), this.setState({ isNotified: false })]}
          className="notification-icon"
        />
        <span
          style={
            this.state.isNotified
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

const mapDispatchToProps = (dispatch) => {
  return {
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
  };
};

export default connect(null, mapDispatchToProps)(NotificationIcon);
