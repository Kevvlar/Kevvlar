import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import socket from "../../../Socket";

import { closeModal, addNewCardLocal, addNewCardServer } from "../../../redux";

const AddCardModal = ({
  closeModal,
  createCardLocal,
  createCardServer,
  user,
  currentColumnId,
  currrentBoardId,
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardLabel, setCardLable] = useState("");

  return (
    <div className="modal-body">
      <h2 className="modal-title">Add New Card</h2>
      <input
        type="text"
        id="input-big"
        maxLength={75}
        placeholder="Card title"
        className="modal-body-title"
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
      />
      <textarea
        type="text"
        id="desc-big"
        maxLength={1000}
        value={cardBody}
        onChange={(e) => setCardBody(e.target.value)}
        placeholder="Write something..."
        className="modal-body-description"
      ></textarea>
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
          onChange={(e) => setCardLable(e.target.value)}
          value={cardLabel}
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
              id: uuidv4(),
              columnId: currentColumnId,
              boardId: currrentBoardId,
              title: cardTitle,
              description: cardBody,
              date: cardDate,
              colorLabel: cardLabel,
            };
            createCardLocal(cardObj);
            createCardServer(user.token, currrentBoardId, cardObj);
            socket.emit("add-new-card", cardObj);
            setCardTitle("");
            setCardBody("");
            setCardDate("");
            setCardLable("");
            closeModal();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    currrentBoardId: state.board.selectBoard.id,
    currentColumnId: state.column.selectColumn.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createCardLocal: (cardObj) => dispatch(addNewCardLocal(cardObj)),
    createCardServer: (token, boardId, cardObj) =>
      dispatch(addNewCardServer(token, boardId, cardObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCardModal);
