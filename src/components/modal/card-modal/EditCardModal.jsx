import React, { useState } from "react";
import { connect } from "react-redux";

import socket from "../../../Socket";

import {
  closeModal,
  editCardLocal,
  editCardServer,
  deleteCardLocal,
  deleteCardServer,
} from "../../../redux";

const EditCardModal = ({
  closeModal,
  updateCardLocal,
  updateCardServer,
  handleDeleteCardLocal,
  handleDeleteCardServer,
  user,
  currrentBoardId,
  currentCard,
}) => {
  const [editCardTitle, setEditCardTitle] = useState(currentCard.title);
  const [editCardBody, setEditCardBody] = useState(currentCard.description);
  const [editCardDate, setEditCardDate] = useState(currentCard.date);
  const [editCardColor, setEditCardColor] = useState(currentCard.colorLabel);

  return (
    <div className="modal-body">
      <h2 className="modal-title">Edit Card</h2>
      <input
        type="text"
        id="input-big"
        maxLength={75}
        placeholder="Card title"
        className="modal-body-title"
        value={editCardTitle}
        onChange={(e) => setEditCardTitle(e.target.value)}
      />
      <textarea
        type="text"
        id="desc-big"
        maxLength={1000}
        value={editCardBody}
        onChange={(e) => setEditCardBody(e.target.value)}
        placeholder="Write something..."
        className="modal-body-description"
      ></textarea>
      <div className="modal-footer-container">
        <input
          className="date-picker"
          value={editCardDate}
          onChange={(e) => setEditCardDate(e.target.value)}
          type="date"
          name="Due Date"
        />
        <select
          className="select-color"
          onChange={(e) => setEditCardColor(e.target.value)}
          value={editCardColor}
        >
          <option value="">Color Label</option>
          <option value="#B0B0B0">grey</option>
          <option value="#F8BE7A">yellow</option>
          <option value="#E34B4B">red</option>
        </select>
        <button
          className="modal-board-button"
          onClick={() => {
            const cardObj = {
              id: currentCard.id,
              columnId: currentCard.columnId,
              title: editCardTitle,
              description: editCardBody,
              date: editCardDate,
              colorLabel: editCardColor,
            };
            updateCardLocal(cardObj);
            updateCardServer(
              user.token,
              currrentBoardId,
              currentCard.id,
              cardObj
            );
            socket.emit("edit-card", cardObj);
            closeModal();
          }}
        >
          Save
        </button>
        <button
          className="delete-button"
          onClick={() => {
            const deleteObj = {
              columnId: currentCard.columnId,
              cardId: currentCard.id,
            };
            handleDeleteCardLocal(deleteObj);
            handleDeleteCardServer(user.token, currrentBoardId, currentCard.id);
            socket.emit("delete-card", deleteObj);
            closeModal();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    currrentBoardId: state.board.selectBoard.id,
    currentCard: state.column.selectCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    updateCardLocal: (cardObj) => dispatch(editCardLocal(cardObj)),
    updateCardServer: (token, boardId, cardId, cardObj) =>
      dispatch(editCardServer(token, boardId, cardId, cardObj)),
    handleDeleteCardLocal: (deleteObj) => dispatch(deleteCardLocal(deleteObj)),
    handleDeleteCardServer: (token, boardId, cardId) =>
      dispatch(deleteCardServer(token, boardId, cardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCardModal);
