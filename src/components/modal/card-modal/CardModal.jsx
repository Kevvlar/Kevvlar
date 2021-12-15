import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  closeModal,
  addNewCardLocal,
  addNewCardServer,
  editCardLocal,
  editCardServer,
  deleteCardLocal,
  deleteCardServer,
} from "../../../redux";
import { ADD, EDIT } from "../../../redux/modal/modalTypes";

import "./cardModal.css";

const CardModal = ({
  user,
  closeModal,
  type,
  currrentBoardId,
  currentColumnId,
  createCardLocal,
  createCardServer,
  currentCard,
  updateCardLocal,
  updateCardServer,
  handleDeleteCardLocal,
  handleDeleteCardServer,
}) => {
  const AddCardModal = () => {
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
        {/**Did you leave this code here on purpose? */}
        {/*
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
        */}
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

  const EditBoardModal = () => {
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
              closeModal();
            }}
          >
            Save
          </button>
          <button
            className="delete-button"
            onClick={() => {
              handleDeleteCardLocal({
                columnId: currentCard.columnId,
                cardId: currentCard.id,
              });
              handleDeleteCardServer(
                user.token,
                currrentBoardId,
                currentCard.id
              );
              closeModal();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="modal">
      <div className="close-icon-container">
        <FaTimes onClick={closeModal} className="close-icon" />
        {type === ADD ? <AddCardModal /> : null}
        {type === EDIT ? <EditBoardModal /> : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    type: state.modal.modalActionType,
    currrentBoardId: state.board.selectBoard.id,
    currentColumnId: state.column.selectColumn.id,
    currentCard: state.column.selectCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createCardLocal: (cardObj) => dispatch(addNewCardLocal(cardObj)),
    createCardServer: (token, boardId, cardObj) =>
      dispatch(addNewCardServer(token, boardId, cardObj)),
    updateCardLocal: (cardObj) => dispatch(editCardLocal(cardObj)),
    updateCardServer: (token, boardId, cardId, cardObj) =>
      dispatch(editCardServer(token, boardId, cardId, cardObj)),
    handleDeleteCardLocal: (deleteObj) => dispatch(deleteCardLocal(deleteObj)),
    handleDeleteCardServer: (token, boardId, cardId) =>
      dispatch(deleteCardServer(token, boardId, cardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
