import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { BoardIcon } from "../../assets/svg/iconlibrary";

import { setCurrentBoardData, setBoardModal, fetchColumns } from "../../redux";
import { EDIT, DELETE } from "../../redux/modal/modalTypes";

import "./boardItem.css";

const boardItem = ({
  user,
  board,
  setSelectBoardData,
  showModal,
  history,
  match,
  getColumns,
}) => {
  return (
    <div className="board-item">
      <span
        className="class-for-item-on-click-event"
        onClick={() => {
          getColumns(user.token, board.id);
          setSelectBoardData(board);
          history.push(`${match.url}/${board.title.toLowerCase()}/${board.id}`);
        }}
      >
        <div className="title-container">
          <BoardIcon />
          <span className="board-item-title">{board.title}</span>
        </div>
        <div className="board-item-info-container">
          <p className="sub-color board-item-no-margin">
            {board.numberOfColumns} Columns
          </p>
          <p className="sub-color board-item-no-margin">
            {board.numberOfCards} Cards
          </p>
        </div>
      </span>
      <div className="board-item-footer">
        <div className="board-num-members sub-color">
          {board.members.length + board.admins.length} Users
        </div>
        {board.admins.includes(user._id) ? (
          <div className="board-item-icons">
            <FaEdit
              className="edit-board-icon"
              onClick={() => {
                setSelectBoardData(board);
                showModal(EDIT);
              }}
            />
            <FaTrash
              className="delete-board-icon"
              onClick={() => {
                setSelectBoardData(board);
                showModal(DELETE);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectBoardData: (board) => dispatch(setCurrentBoardData(board)),
    getColumns: (token, boardId) => dispatch(fetchColumns(token, boardId)),
    showModal: (type) => dispatch(setBoardModal(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(boardItem));
