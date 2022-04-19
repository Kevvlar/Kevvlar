import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

import { BoardIcon } from "../../assets/svg/iconlibrary";

import { setCurrentBoardData, setBoardModal, fetchActivities } from "../../redux";
import { EDIT, DELETE } from "../../redux/modal/modalTypes";
import { EditIcon, TrashIcon } from "../../assets/svg/iconlibrary";

import "./boardItem.css";

const BoardItem = ({
  user,
  board,
  setSelectBoardData,
  showModal,
  history,
  match,
}) => {

  const [graphdata, setGraphdata] = useState([]);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  useEffect(() => {
    axios
      .get(`https://kevvlar.herokuapp.com/api/v1/activities`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        params: {
          boardId: board.id
        },
      })
      .then((response) => {
        const activities = response.data.data.activities;

        const activityDates = activities?.map((activity) => (
          parseFloat((activity?.info?.date).substr(4))
        ));

        setGraphdata(activityDates);
  
      })
      .catch((error) => {
        console.log(error);
      });
      

  }, []);

  const fourteenDaysAgo = moment().subtract(14, 'days');

  let barChartArray = new Array(14).fill(0);


  graphdata.forEach((activity) => {
    const dateAsMoment = moment(activity, 'MMM Do, YYYY')
    const DateIsInFourteenDayRange = moment(dateAsMoment).isAfter(fourteenDaysAgo, 'day')
    if(DateIsInFourteenDayRange) {
      //initalizes a new moment that start at the beginning of the day
      //checks the differences in days between now and that date
      //uses that difference to populat the barChartArray
      const index = moment().startOf('day').diff(dateAsMoment, 'days')
      barChartArray[index]++
    }
  })

  console.log(barChartArray);

  const finalchart = () => {

    return (
        barChartArray.map((activity, index) => (
          <div key={index}>
            <div className="graph-square" style={{height: (barChartArray[index])*5}} title={(barChartArray[index]) + ' activities'}></div>
          </div>))
      )
  }

  return (
    <div className="board-item">
      <span
        className="class-for-item-on-click-event"
        onClick={() => {
          setSelectBoardData(board);
          history.push({
            pathname: `${match.url}/${board?.id}`,
          });
        }}
      >
        <div className="title-container">
          <BoardIcon />
          <span className="board-item-title">{board?.title}</span>
        </div>
        <div className="board-item-info-container">
          <div>
            <p className="sub-color board-item-no-margin">
              {board?.numberOfColumns} Columns
            </p>
            <p className="sub-color board-item-no-margin">
              {board?.numberOfCards} Cards
            </p>
          </div>
          <div className="board-graph">
            {finalchart()}
          </div>
        </div>
      </span>
      <div className="board-item-footer">
        <div className="board-num-members sub-color">
          {board?.members?.length + board?.admins?.length} Users
        </div>
        {board?.admins[0]._id.includes(user._id) ? (
          <div className="board-item-icons">
            <TrashIcon
              handleDelete={() => {
                setSelectBoardData(board);
                showModal(DELETE);
              }}
              className="column-header-trash-icon"
            />
            <EditIcon
              handleEdit={() => {
                setSelectBoardData(board);
                showModal(EDIT);
              }}
              className="column-header-edit-icon"
            />
          </div>
        ) : (
          <div className="admin-name">
            <p>
              <strong>Admin: </strong>
              {board?.admins[0].name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    activities: state.column.activities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectBoardData: (board) => dispatch(setCurrentBoardData(board)),
    getActivities: (token, boardId) =>
      dispatch(fetchActivities(token, boardId)),
    showModal: (type) => dispatch(setBoardModal(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BoardItem));
