import React from "react";

import "./board-item.styles.css";

const BoardItem = ({ boardName }) => (
  <div className="sidenav-board-item">{boardName}</div>
);

export default BoardItem;
