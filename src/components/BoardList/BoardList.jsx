import React from "react";
import { connect } from "react-redux";

import BoardItem from "../BoardItem/BoardItem";

import "./boardList.css";

const BoardList = ({ boards }) => {
  return (
    <div className="board-list-holder">
      <div className="boards-list">
        {boards.map((boardItem) => (
          <BoardItem key={boardItem.id} board={boardItem} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
  };
};

export default connect(mapStateToProps, null)(BoardList);
