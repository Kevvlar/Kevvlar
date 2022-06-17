import React, { useEffect } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";

import "./activityModal.css";

import { toggleActivity, fetchActivities } from "../../redux";

const ActivityModal = ({
  user,
  board,
  activities,
  showActivity,
  getActivities,
}) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    getActivities(user.token, board.id);
  }, [user.token, board.id, getActivities]);

  return (
    <div>
      <div
        className="activity-close-wrapper"
        onClick={() => {
          showActivity();
        }}
      ></div>
      <div className="activity-profile-menu">
        <div className="activity-main-title">Activity</div>
        <div className="activity-item-wrapper">
          {activities.map((activity) => (
            <div className="activity-item-holder" key={activity?._id}>
              <div className="activity-info-holder">
                <div className="activity-user-name">
                  {activity?.info?.user}&nbsp;
                </div>
                <div className="activity-helper-text">
                  {activity?.info?.title}&nbsp;
                </div>
                <div className="activity-assigned-user">
                  {activity?.info?.userAssigned}&nbsp;
                </div>
                <div
                  className="activity-card-title"
                  title={activity?.info?.cardTitle}
                >
                  {activity?.info?.cardTitle}&nbsp;
                </div>
              </div>
              <div className="task-item-board">
                {activity?.info?.date} at{" "}
                {activity?.info?.realTime
                  ? dateFormat(
                      activity?.info?.realTime.toLocaleString("en-US", {
                        timeZone: timezone,
                      }),
                      "h:MM TT"
                    )
                  : activity?.info?.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activities: state.column.activities,
    user: state.user.userData,
    board: state.board.selectBoard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showActivity: () => dispatch(toggleActivity()),
    getActivities: (token, boardId) =>
      dispatch(fetchActivities(token, boardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
