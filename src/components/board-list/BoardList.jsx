import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";

import { setBoardModal } from "../../redux/index";

import BoardItem from "../board-item/BoardItem";

import "./boardlist.css";

const BoardList = ({ addNewBoardModal, boardsList }) => {
  return (
    <div className="sidenav-left-board-list">
      <InfiniteScroll
        dataLength={boardsList.length}
        hasMore={true}
        height={300}
      >
        {boardsList.map((board, index) => (
          <BoardItem key={index} board={board} />
        ))}
      </InfiniteScroll>
      <div
        onClick={addNewBoardModal}
        className="sidenav-left-add-new-board-button"
      >
        + Add new board
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewBoardModal: () => dispatch(setBoardModal()),
  };
};

const mapStateToProps = (state) => {
  return {
    boardsList: state.board.boards,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardList);
