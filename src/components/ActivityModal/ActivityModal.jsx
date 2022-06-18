import React, { useEffect } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { withRouter } from "react-router";

import "./activityModal.css";

import { toggleActivity, fetchActivities, fetchCard } from "../../redux";

const ActivityModal = ({
  user,
  board,
  activities,
  showActivity,
  getActivities,
  history,
  getCard,
  editCardModal,
}) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    getActivities(user.token, board.id);
  }, [user.token, board.id, getActivities]);

  const showCard = (activityTitle, card) => {
    if (activityTitle === "deleted card") return;
    if (card) {
      history.push(`/boards/${board.id}/${card.id}`);
      showActivity();
      getCard(user.token, board.id, card.id);
    }
  };

  return (
    <div>
      <div
        className="activity-close-wrapper"
        onClick={() => {
          showActivity();
        }}
      >
        {console.log(activities)}
      </div>
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
                  onClick={() => {
                    activity.info.card &&
                      showCard(activity?.info?.title, activity?.info?.card);
                  }}
                >
                  {activity.info.card
                    ? activity?.info?.card?.title
                    : activity?.info?.cardTitle}
                  &nbsp;
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
    getCard: (token, boardId, cardId) =>
      dispatch(fetchCard(token, boardId, cardId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ActivityModal));
