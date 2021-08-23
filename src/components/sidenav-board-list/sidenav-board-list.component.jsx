import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BoardItem from "../board-item/board-item.component";

import "./sidenav-board-list.styles.css";

const SideNavBoardList = () => (
  <div className="side-nav-board-list">
    <InfiniteScroll dataLength={35} hasMore={true} height={300}>
      <BoardItem boardName="Board 1" />
      <BoardItem boardName="Board 2" />
      <BoardItem boardName="Board 3" />
      <BoardItem boardName="Board 4" />
      <BoardItem boardName="Board 5" />
      <BoardItem boardName="Board 6" />
      <BoardItem boardName="Board 7" />
      <BoardItem boardName="Board 8" />
      <BoardItem boardName="Board 9" />
      <BoardItem boardName="Board 10" />
      <BoardItem boardName="Board 11" />
      <BoardItem boardName="Board 12" />
    </InfiniteScroll>
    <div className="sidenav-add-new-board-button">+ Add new board</div>
  </div>
);

export default SideNavBoardList;
