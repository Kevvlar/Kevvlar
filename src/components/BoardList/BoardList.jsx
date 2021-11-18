import React from "react";

import BoardItem from "../BoardItem/BoardItem";

import "./boardList.css";

const BoardList = () => {
  return (
    <div className="board-list-holder">
      <div className="boards-list">
        <BoardItem />
      </div>
    </div>
  );
};

export default BoardList;
