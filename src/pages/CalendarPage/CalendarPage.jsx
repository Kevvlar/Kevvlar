import React from "react";

import "./calendarPage.css";

const CalendarPage = () => {
  return (
    <table border="1px" className="calendar-table">
      <tr className="calendar-header-row">
        <th>Day/Time</th>
        <th>08:00 - 09:00</th>
        <th>09:00 - 10:00</th>
        <th>10:00 - 11:00</th>
        <th>11:00 - 12:00</th>
        <th>01:00 - 02:00</th>
        <th>02:00 - 03:00</th>
        <th>04:00 - 05:00</th>
      </tr>
      <tr>
        <td>MONDAY</td>
      </tr>
      <tr>
        <td>TUESDAY</td>
      </tr>
      <tr>
        <td>WEDNESDAY</td>
      </tr>
      <tr>
        <td>THURSDAY</td>
      </tr>
      <tr>
        <td>FRIDAY</td>
      </tr>
      <tr>
        <td>SATURDAY</td>
      </tr>
      <tr>
        <td>SATURDAY</td>
      </tr>
    </table>
  );
};

export default CalendarPage;
