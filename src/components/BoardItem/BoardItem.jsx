import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { BoardIcon } from "../../assets/svg/iconlibrary";

import { setCurrentBoardData, setBoardModal } from "../../redux";
import { EDIT, DELETE } from "../../redux/modal/modalTypes";
import { EditIcon, TrashIcon } from "../../assets/svg/iconlibrary";

import "./boardItem.css";

const boardItem = ({
  user,
  board,
  setSelectBoardData,
  showModal,
  history,
  match,
}) => {
  return (
    <div className="board-item">
      <span
        className="class-for-item-on-click-event"
        onClick={() => {
          setSelectBoardData(board);
          history.push({
            pathname: `${match.url}/${board.id}`,
          });
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
          {board?.members.length + board?.admins.length} Users
        </div>
        {board?.admins[0]._id.includes(user._id) ? (
          <div className="board-item-icons">
            <TrashIcon
              handleDelete={() => {
                setSelectBoardData(board);
                showModal(DELETE);
              }}
              className="column-header-trash-icon"
            />
            <EditIcon
              handleEdit={() => {
                setSelectBoardData(board);
                showModal(EDIT);
              }}
              className="column-header-edit-icon"
            />
          </div>
        ) : (
          <div className="admin-name">
            <p>
              <strong>Admin: </strong>
              {board?.admins[0].name}
            </p>
          </div>
        )}
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
    showModal: (type) => dispatch(setBoardModal(type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(boardItem));
