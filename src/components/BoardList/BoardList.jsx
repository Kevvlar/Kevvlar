import React from "react";
import { connect } from "react-redux";

import BoardItem from "../BoardItem/BoardItem";

import "./boardList.css";

const BoardList = ({ boards, searchKeyWord }) => {
  return (
    <div className="board-list-holder">
      <div className="boards-list">
        {boards
          .filter((board) => board.title.toLowerCase().includes(searchKeyWord))
          .map((boardItem) => (
            <BoardItem key={boardItem.id} board={boardItem} />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
    searchKeyWord: state.board.searchKey,
  };
};

export default connect(mapStateToProps, null)(BoardList);
