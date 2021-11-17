import React from "react";

import { BoardIcon, EditIcon, DeleteIcon } from "../../assets/svg/iconlibrary";
import AppBar from "../../components/appbar/AppBar";

import "./boardsPage.css";

const BoardsPage = () => {
  return (
    <div>
      <AppBar />
      <div className="boards-page">
        <div className="board-main">
          <input type="text" placeholder="Search" className="boards-search" />
          <div className="boards-container">
            <h2 className="all-boards-title">All Boards</h2>
            <div className="boards-list">
              <div className="board-item">
                <div className="title-container">
                  <BoardIcon />
                  <span className="board-item-title">Title</span>
                </div>
                <p>7 Columns</p>
                <p>42 Cards</p>
                <div className="board-item-footer">
                  <div className="board-num-members">12 Members</div>
                  <div className="board-item-icons">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </div>
              </div>
              <div className="board-item">
                <div className="title-container">
                  <BoardIcon />
                  <span className="board-item-title">Title</span>
                </div>
                <p>7 Columns</p>
                <p>42 Cards</p>
                <div className="board-item-footer">
                  <div className="board-num-members">12 Members</div>
                  <div className="board-item-icons">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </div>
              </div>
              <div className="add-board-button">+ New Board</div>
            </div>
          </div>
        </div>

        <div className="team-boards">
          <div className="boards-container">
            <h2 className="all-boards-title">Team Board</h2>
            <div className="boards-list">
              <div className="board-item">
                <div className="title-container">
                  <BoardIcon />
                  <span className="board-item-title">Title</span>
                </div>
                <p>7 Columns</p>
                <p>42 Cards</p>
                <div className="board-item-footer">
                  <div className="board-num-members">12 Members</div>
                  <div className="board-item-icons">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </div>
              </div>
              <div className="board-item">
                <div className="title-container">
                  <BoardIcon />
                  <span className="board-item-title">Title</span>
                </div>
                <p>7 Columns</p>
                <p>42 Cards</p>
                <div className="board-item-footer">
                  <div className="board-num-members">12 Members</div>
                  <div className="board-item-icons">
                    <EditIcon />
                    <DeleteIcon />
                  </div>
                </div>
              </div>
              <div className="add-board-button">+ New Board</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;
