import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import TaskItem from "../task/Task";

import {
  toggleGridCard,
  toggleFlatCard,
  handleLogOutUser,
  toggleRightSideNav,
  clearBoards,
  clearColumns,
  getNotifications,
} from "../../redux/index.js";

import "./sideNavRight.css";

class RightSideNav extends React.Component {
  componentDidMount() {
    this.props.getNotifications(this.props.user.token);
  }

  render() {
    return (
      <div>
        <div
          className="sidenav-right-close-wrapper"
          onClick={() => {
            this.props.toggleRightSideNav();
          }}
        ></div>
        <nav className="sidenav-right-container">
          <div className="sidenav-right-menu-activity">
            <div className="sidenav-right-activity-title">Notifications</div>
            <InfiniteScroll
              dataLength={this.props.notifications.length}
              hasMore={true}
              height={350}
            >
              {this.props.notifications.map((notification) => (
                <TaskItem info={notification.info} key={notification._id} />
              ))}
            </InfiniteScroll>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    notifications: state.user.notifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleGrid: () => dispatch(toggleGridCard()),
    toggleFlat: () => dispatch(toggleFlatCard()),
    logUserOut: (history) => dispatch(handleLogOutUser(history)),
    toggleRightSideNav: () => dispatch(toggleRightSideNav()),
    emptyBoards: () => dispatch(clearBoards()),
    emptyColumns: () => dispatch(clearColumns()),
    getNotifications: (token) => dispatch(getNotifications(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RightSideNav));

//  {/* <div className="sidenav-right-menu-icons-container">
//           <button className="sidenav-right-grid-icon">
//             <FaThLarge onClick={() => toggleGrid()} />
//           </button>
//           <button className="sidenav-right-minus-icon">
//             <FaMinus onClick={() => toggleFlat()} />
//           </button>
//         </div> */}
