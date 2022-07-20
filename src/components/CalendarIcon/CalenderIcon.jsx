import React from "react";
import { AiFillCalendar } from "react-icons/ai";
import { connect } from "react-redux";

import { setCalendarModal } from "../../redux";

import "./calendarIcon.css";

const CalenderIcon = ({ showCalendar }) => {
  return (
    <button className="calendar-button" onClick={showCalendar}>
      <AiFillCalendar className="calendar-icon" />
    </button>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showCalendar: () => dispatch(setCalendarModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalenderIcon);
