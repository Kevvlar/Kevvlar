import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BoardItem from "../board-item/board-item.component";

import "./sidenav-left-board-list.styles.css";

class LeftSideNavBoardList extends React.Component {
  constructor() {
    super();

    this.state = {
      user: "tdewHYec4HVWBh9cfqo4rix3Rze2",
      boards: [
        {
          id: 1,
          name: "Kevvlar",
        },
        {
          id: 2,
          name: "Housify",
        },
        {
          id: 3,
          name: "Butterfly",
        },
        {
          id: 4,
          name: "Reddit",
        },
        {
          id: 5,
          name: "Discord",
        },
        {
          id: 6,
          name: "Google",
        },
        {
          id: 7,
          name: "Facebook",
        },
      ],
    };
  }

  handleAddBoard = () => {
    this.props.createBoardActionType();
    this.props.showModal();
  };

  render() {
    return (
      <div className="sidenav-left-board-list">
        <InfiniteScroll
          dataLength={this.state.boards.length}
          hasMore={true}
          height={300}
        >
          {this.state.boards.map((board) => (
            <BoardItem
              key={board.id}
              board={board}
              showModal={this.props.showModal}
              editBoardActionType={this.props.editBoardActionType}
              deleteModalActionType={this.props.deleteModalActionType}
            />
          ))}
        </InfiniteScroll>
        <div
          onClick={this.handleAddBoard}
          className="sidenav-left-add-new-board-button"
        >
          + Add new board
        </div>
      </div>
    );
  }
}

export default LeftSideNavBoardList;
