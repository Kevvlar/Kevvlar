import React from "react";
import { connect } from "react-redux";

import "./activityModal.css";

const ActivityModal = ({ activities }) => {
  return (
    <div className="activity-profile-menu">
      <div className="activity-main-title">Activity</div>
      <div className="activity-item-wrapper">
        {activities.map((activity) => (
          <div className="activity-item-holder" key={activity._id}>
            <div className="activity-info-holder">
              <div className="activity-user-name">
                {activity.info.user}&nbsp;
              </div>
              <div className="activity-helper-text">
                {activity.info.title}&nbsp;
              </div>
              <div className="activity-assigned-user">
                {activity.info.userAssigned}&nbsp;
              </div>
              <div className="activity-card-title">
                {activity.info.cardTitle}&nbsp;
              </div>
            </div>
            <div className="task-item-board">
              {activity.info.date} at {activity.info.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.column.activities,
  };
};

export default connect(mapStateToProps, null)(ActivityModal);
