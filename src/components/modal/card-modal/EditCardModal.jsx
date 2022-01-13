import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import socket from "../../../Socket";

import {
  closeModal,
  editCardLocal,
  editCardServer,
  deleteCardLocal,
  deleteCardServer,
} from "../../../redux";

const MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["bold", "italic", "underline"],
    [{ align: [] }],
    ["image", "code-block", "blockquote", "link"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const EditCardModal = ({
  closeModal,
  updateCardLocal,
  updateCardServer,
  handleDeleteCardLocal,
  handleDeleteCardServer,
  user,
  currrentBoardId,
  currentCard,
  admins,
  members,
}) => {
  const users = [...admins, ...members];

  const [editCardTitle, setEditCardTitle] = useState(currentCard.title);
  const [editCardBody, setEditCardBody] = useState(currentCard.description);
  const [editCardDate, setEditCardDate] = useState(currentCard.date);
  const [editCardColor, setEditCardColor] = useState(currentCard.colorLabel);
  const [editCardUsers, setEditCardUsers] = useState(currentCard?.users);
  const [showDropDown, setShowDropDown] = useState(false);

  const rteChange = (content, delta, source, editor) => {
    setEditCardBody(editor.getHTML());
    // console.log(editor.getHTML()); // rich text
    // console.log(editor.getText()); // plain text
    // console.log(editor.getLength()); // number of characters
    // console.log("C: ", content);
    // console.log("Delta: ", delta);
    // console.log("Source: ", source);
  };

  const handleSubmit = () => {
    const cardObj = {
      id: currentCard.id,
      columnId: currentCard.columnId,
      title: editCardTitle,
      description: editCardBody,
      date: editCardDate,
      colorLabel: editCardColor,
    };
    updateCardLocal(cardObj);
    updateCardServer(user.token, currrentBoardId, currentCard.id, cardObj);
    socket.emit("edit-card", cardObj);
    closeModal();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="modal-body"
    >
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
      <div className="modal-body-description">
        <ReactQuill
          theme="snow"
          modules={MODULES}
          onChange={rteChange}
          value={editCardBody}
        />
      </div>
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

        <div className={`assign-user-dropdown ${showDropDown ? "is-active" : ""}`}>
          <div
            onClick={() => {
              setShowDropDown(!showDropDown);
            }}
          >
            Assign User
          </div>
          <div className={`assign-user-wrapper ${showDropDown ? "active-wrapper" : ""}`}
          onClick={() => {
            setShowDropDown(!showDropDown);
            console.log('clicked wrapper');
          }}>
          
            
          </div>
          <ul className="assign-user-dropdown-list">
          <h2 className="modal-title">Assign a User</h2>
            {users.map((user, index) => (
              <li className="assign-user-list-item" key={index}>
                <label>
                  <input type="checkbox" name={user.name} value={user._id} />
                </label>
                <div className="assign-user-list-container">
                <img
                  className="user-avatar-image assign-user-image"
                  alt="img"
                  src={user.photo}
                  title={user.name}
                />
                <div>
                  <div className="assign-user-list-name">{user.name}</div>
                  <div className="assign-user-list-email">{user.email}</div>
                </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="modal-board-button" type="submit">
          Save
        </button>
        <div
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
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    currrentBoardId: state.board.selectBoard.id,
    currentCard: state.column.selectCard,
    admins: state.board.selectBoard.admins,
    members: state.board.selectBoard.members,
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
