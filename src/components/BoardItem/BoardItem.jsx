import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { BoardIcon } from "../../assets/svg/iconlibrary";

import { setCurrentBoardData, setBoardModal } from "../../redux";
import { EDIT, DELETE } from "../../redux/modal/modalTypes";

import "./boardItem.css";

const boardItem = ({
  board,
  setSelectBoardData,
  showModal,
  history,
  match,
}) => {
  return (
    <div
      className="board-item"
      onClick={() => {
        setSelectBoardData({
          id: board.id,
          title: board.title,
        });
        history.push(
          `${match.url}/${board.title.toLowerCase()}/${board.id}/${uuidv4()}`
        );
      }}
    >
      <div className="title-container">
        <BoardIcon />
        <span className="board-item-title">{board.title}</span>
      </div>
      <div className="board-item-info-container">
        <p className="sub-color board-item-no-margin">7 Columns</p>
        <p className="sub-color board-item-no-margin">42 Cards</p>
      </div>
      <div className="board-item-footer">
        <div className="board-num-members sub-color">12 Members</div>
        <div className="board-item-icons">
          <FaEdit
            className="edit-board-icon"
            onClick={() => {
              setSelectBoardData({
                id: board.id,
                title: board.title,
              });
              showModal(EDIT);
            }}
          />
          <FaTrash
            className="delete-board-icon"
            onClick={() => {
              setSelectBoardData({
                id: board.id,
                title: board.title,
              });
              showModal(DELETE);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectBoardData: (board) => dispatch(setCurrentBoardData(board)),
    showModal: (type) => dispatch(setBoardModal(type)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(boardItem));
