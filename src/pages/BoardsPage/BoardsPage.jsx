import React from "react";

import AppBar from "../../components/appbar/AppBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import BoardList from "../../components/BoardList/BoardList";

import "./boardsPage.css";

const BoardsPage = () => {
  return (
    <div>
      <AppBar />
      <div className="boards-page">
        <div className="board-main">
          <SearchBar />
          <div className="boards-container">
            <h2 className="all-boards-title">All Boards</h2>
            <div className="board-list-holder">
              <BoardList />
              <div className="add-board-button sub-color">+ New Board</div>
            </div>
          </div>

          <div className="boards-container">
            <h2 className="all-boards-title">Team Board</h2>
            <div className="board-list-holder">
              <div className="add-board-button sub-color">+ New Board</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
