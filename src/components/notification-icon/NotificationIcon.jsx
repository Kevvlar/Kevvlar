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

    this.interval = setInterval(() => {
      if (this.state.isNotified) {
        this.setState({ isNotified: false });
      }
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="notification-icon-container">
        <FaBell
          onClick={() => this.props.toggleRightSideNav()}
          className="notification-icon"
        />
        <span
          style={
            this.state.isNotified
              ? {
                  backgroundColor: "red",
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
