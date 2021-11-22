import React from "react";
import { connect } from "react-redux";
import Modal from "../../components/modal/Modal";
import { setBoardModal } from "../../redux";

import BoardItem from "../BoardItem/BoardItem";

import "./boardList.css";

const BoardList = ({ boards, searchKeyWord, showModal, showBoardModal }) => {
  return (
    <div className="boards-list">
      {boards
        .filter((board) => board.title.toLowerCase().includes(searchKeyWord))
        .map((boardItem) => (
          <BoardItem key={boardItem.id} board={boardItem} />
        ))}
        <div
          className="add-board-button sub-color"
          onClick={() => showBoardModal()}
        >
          + Add New Board
        </div>
        {showModal ? <Modal /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.board.boards,
    searchKeyWord: state.board.searchKey,
    showModal: state.modal.showModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showBoardModal: () => dispatch(setBoardModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null)(BoardList);
