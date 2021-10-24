import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { connect } from "react-redux";

import { closeModal, addCard } from "../../../redux";

import "./cardModal.css";

const CardModal = ({ closeModal, boardId, columnId, addNewCard }) => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardColor, setCardColor] = useState("");

  return (
    <div className="modal">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
      </div>
      <h2 className="modal-title">Add New Card</h2>
      <div className="modal-body">
        <input
          type="text"
          id="input-big"
          maxLength="50"
          placeholder="Card title"
          className="modal-body-title"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <textarea
          type="text"
          id="desc-big"
          maxLength="50"
          value={cardBody}
          onChange={(e) => setCardBody(e.target.value)}
          placeholder="Write something..."
          className="modal-body-description"
        ></textarea>
        <div className="modal-checkbox-area">
          <div className="modal-checkbox-bar">
            <FaCheck className="modal-check-icon-check" />
            <div className="modal-progress-bar-contianer">
              <div id="cba182952" className="cbabarprogress"></div>
            </div>
            <div className="modal-progress-percentage">0 %</div>
          </div>
          <div className="modal-check-columns"></div>
          <input placeholder="+ Add item" className="modal-checkbox-input" />
        </div>
        <div className="modal-footer-container">
          <input
            className="date-picker"
            value={cardDate}
            onChange={(e) => setCardDate(e.target.value)}
            type="date"
            name="Due Date"
          />
          <select
            className="select-color"
            onChange={(e) => setCardColor(e.target.value)}
            value={cardColor}
          >
            <option value="">Color Label</option>
            <option value="#ff0000">Red</option>
            <option value="#26d100">Green</option>
            <option value="#ffff07">Yellow</option>
            <option value="#143bff">Blue</option>
          </select>
          <button
            className="modal-board-button"
            onClick={() => {
              addNewCard(
                {
                  title: cardTitle,
                  description: cardBody,
                  date: cardDate,
                  colorLabel: cardColor,
                  board: boardId,
                  column: columnId,
                },
                boardId,
                columnId
              );
              setCardTitle("");
              setCardBody("");
              setCardDate("");
              setCardColor("");
              closeModal();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    boardId: state.board.currentBoardId,
    columnId: state.column.currentColumnId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    addNewCard: (data, boardId, columnId) =>
      dispatch(addCard(data, boardId, columnId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
