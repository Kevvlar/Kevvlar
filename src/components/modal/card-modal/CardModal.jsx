import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import {
  closeModal,
  addNewCardLocal,
  editCardLocal,
  deleteCardLocal,
} from "../../../redux";
import { ADD, EDIT } from "../../../redux/modal/modalTypes";

import "./cardModal.css";

const CardModal = ({
  closeModal,
  type,
  currrentBoardId,
  currentColumnId,
  createCardLocal,
  currentCard,
  updateCardLocal,
  deleteCard,
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
              createCardLocal({
                id: uuidv4(),
                columnId: currentColumnId,
                boardId: currrentBoardId,
                title: cardTitle,
                description: cardBody,
                date: cardDate,
                label: cardLabel,
              });
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
    const [editCardColor, setEditCardColor] = useState(currentCard.label);

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
              updateCardLocal({
                id: currentCard.id,
                columnId: currentCard.columnId,
                title: editCardTitle,
                description: editCardBody,
                date: editCardDate,
                label: editCardColor,
              });
              closeModal();
            }}
          >
            Save
          </button>
          <button
            className="delete-button"
            onClick={() => {
              deleteCard({
                columnId: currentCard.columnId,
                cardId: currentCard.id,
              });
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
    type: state.modal.modalActionType,
    currrentBoardId: state.board.selectBoardId,
    currentColumnId: state.column.currentColumnId,
    currentCard: state.column.currentCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    createCardLocal: (cardObj) => dispatch(addNewCardLocal(cardObj)),
    updateCardLocal: (cardObj) => dispatch(editCardLocal(cardObj)),
    deleteCard: (deleteObj) => dispatch(deleteCardLocal(deleteObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);
