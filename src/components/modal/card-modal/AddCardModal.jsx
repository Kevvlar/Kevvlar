import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import socket from "../../../Socket";

import { closeModal, addNewCardLocal, addNewCardServer } from "../../../redux";

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

const AddCardModal = ({
  closeModal,
  createCardLocal,
  createCardServer,
  user,
  currentColumnId,
  currrentBoardId,
  admins,
  members,
}) => {
  const users = [...admins, ...members];

  const [cardTitle, setCardTitle] = useState("");
  const [cardBody, setCardBody] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardLabel, setCardLable] = useState("");
  const [assignedUsers, setAssignUsers] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const rteChange = (content, delta, source, editor) => {
    setCardBody(editor.getHTML());
    // console.log(editor.getHTML()); // rich text
    // console.log(editor.getText()); // plain text
    // console.log(editor.getLength()); // number of characters
    // console.log("C: ", content);
    // console.log("Delta: ", delta);
    // console.log("Source: ", source);
  };

  const handleSubmit = () => {
    const cardObj = {
      id: uuidv4(),
      columnId: currentColumnId,
      boardId: currrentBoardId,
      title: cardTitle,
      description: cardBody,
      date: cardDate,
      colorLabel: cardLabel,
      users: assignedUsers,
    };
    createCardLocal(cardObj);
    createCardServer(user.token, currrentBoardId, cardObj);
    socket.emit("add-new-card", cardObj);
    setCardTitle("");
    setCardBody("");
    setCardDate("");
    setCardLable("");
    setAssignUsers([]);
    closeModal();
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setAssignUsers([...assignedUsers, e.target.value]);
    } else {
      const unCheckedUser = e.target.value;
      setAssignUsers(assignedUsers.filter((item) => item !== unCheckedUser));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="modal-body"
    >
      <h2 className="modal-title">Add New Card</h2>
      <div className="big-card-container">
        <div className="input-description-container">
          <input
            type="text"
            id="input-big"
            maxLength={75}
            placeholder="Card title"
            className="modal-body-title"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
          />

          <div className="modal-body-description">
            <ReactQuill
              theme="snow"
              modules={MODULES}
              onChange={rteChange}
              value={cardBody}
              className="big-editor"
            />
          </div>
        </div>
        <div className="modal-footer-container">
          <div className="action-buttons-container">
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

            <div
              className={`assign-user-dropdown ${
                showDropDown ? "is-active" : ""
              }`}
            >
              <div
                onClick={() => {
                  setShowDropDown(!showDropDown);
                }}
              >
                Assign User
              </div>
              <div
                className={`assign-user-wrapper ${
                  showDropDown ? "active-wrapper" : ""
                }`}
                onClick={() => {
                  setShowDropDown(!showDropDown);
                }}
              ></div>
              <ul className="assign-user-dropdown-list">
                <h2 className="modal-title">Assign a User</h2>
                {users.map((user, index) => (
                  <li className="assign-user-list-item" key={index}>
                    <input
                      type="checkbox"
                      name={user.email}
                      value={user._id}
                      onChange={handleChange}
                    />
                    <div className="assign-user-list-container">
                      <img
                        className="user-avatar-image assign-user-image"
                        alt="img"
                        src={user.photo}
                        title={user.name}
                      />
                      <div>
                        <div className="assign-user-list-name">{user.name}</div>
                        <div className="assign-user-list-email">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button className="modal-board-button" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    currrentBoardId: state.board.selectBoard.id,
    currentColumnId: state.column.selectColumn.id,
    admins: state.board.selectBoard.admins,
    members: state.board.selectBoard.members,
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

// <textarea
// type="text"
// id="desc-big"
// maxLength={1000}
// value={cardBody}
// onChange={(e) => setCardBody(e.target.value)}
// placeholder="Write something..."
// className="modal-body-description"
// ></textarea>
