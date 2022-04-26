import React, { useState } from "react";
import { connect } from "react-redux";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ImageCompress from "quill-image-compress";
import ImageResize from "quill-image-resize";
import MagicUrl from "quill-magic-url";
import * as Emoji from "quill-emoji";
import dateFormat from "dateformat";

import "quill-emoji/dist/quill-emoji.css";

import socket from "../../../Socket";

import {
  closeModal,
  editCardLocal,
  editCardServer,
  deleteCardLocal,
  deleteCardServer,
  sendNotification,
  turnOffNotify,
  createActivity,
} from "../../../redux";

const EditCardModal = ({
  closeModal,
  updateCardLocal,
  updateCardServer,
  handleDeleteCardLocal,
  handleDeleteCardServer,
  user,
  currentBoardId,
  currentCard,
  admins,
  members,
  notify,
  notifyOff,
  addActivity,
}) => {
  Quill.register("modules/imageCompress", ImageCompress);
  Quill.register("modules/ImageResize", ImageResize);
  Quill.register("modules/magicUrl", MagicUrl);
  Quill.register("modules/emoji", Emoji);

  const MODULES = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["image", "code-block", "blockquote", "link"],
      ["emoji"],
    ],
    clipboard: {
      matchVisual: true,
    },
    ImageResize: {
      modules: ["Resize", "DisplaySize"],
    },
    imageCompress: {
      quality: 0.5, // default
      maxWidth: 500, // default
      maxHeight: 500, // default
      imageType: "image/jpeg", // default
    },
    magicUrl: true,
    "emoji-toolbar": true,
    "emoji-shortname": true,
  };

  const users = [...admins, ...members];

  const [editCardTitle, setEditCardTitle] = useState(currentCard.title);
  const [editCardBody, setEditCardBody] = useState(currentCard.description);
  const [editCardDate, setEditCardDate] = useState(currentCard.date);
  const [editCardColor, setEditCardColor] = useState(currentCard.colorLabel);
  const [editCardUsers, setEditCardUsers] = useState(currentCard.users);
  const [newCheckedUsers, setNewCheckedUsers] = useState([]);
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
      users: editCardUsers,
    };
    updateCardLocal(cardObj);
    updateCardServer(user.token, currentBoardId, currentCard.id, cardObj);

    if (newCheckedUsers.length > 0) {
      for (let i = 0; i < newCheckedUsers.length; i++) {
        const now = Date.now();
        notify(user.token, currentBoardId, {
          user: newCheckedUsers[i]._id,
          type: "assign",
          info: {
            boardId: currentBoardId,
            date: dateFormat(now, "mmm dS, yyyy"),
            time: dateFormat(now, "h:MM TT"),
            cardTitle: editCardTitle,
            title: "Assigned Card",
          },
        });
        addActivity(user.token, currentBoardId, {
          info: {
            title: "assigned user",
            user: user.name,
            userAssigned: newCheckedUsers[i].name,
            cardTitle: editCardTitle,
            date: dateFormat(now, "mmm dS, yyyy"),
            time: dateFormat(now, "h:MM TT"),
          },
          boardId: currentBoardId,
        });
        socket.emit("sendNotification", {
          senderId: user._id,
          receiverId: newCheckedUsers[i]._id,
        });

        if (user._id === newCheckedUsers[i]._id) {
          notifyOff(true);
        }
      }
    }

    socket.emit("edit-card", cardObj);
    closeModal();
  };

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const checkedUser = users.find((user) => user._id === e.target.value);
      setNewCheckedUsers([...newCheckedUsers, checkedUser]);
      setEditCardUsers([...editCardUsers, checkedUser]);
    } else {
      const unCheckedUser = e.target.value;
      setEditCardUsers(
        editCardUsers.filter((user) => user._id !== unCheckedUser)
      );
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
      <h2 className="modal-title">Edit Card</h2>
      <div className="big-card-container">
        <div className="input-description-container">
          <input
            type="text"
            id="input-big"
            maxLength={75}
            placeholder="Card title"
            className="modal-body-title"
            value={editCardTitle}
            onChange={(e) => setEditCardTitle(e?.target?.value)}
          />
          <div className="modal-body-description">
            <ReactQuill
              theme="snow"
              modules={MODULES}
              onChange={rteChange}
              value={editCardBody}
              className="big-editor"
              id="ql-editor-big"
            />
          </div>
        </div>
        <div className="modal-footer-container">
          <div className="action-buttons-container">
            <input
              className="date-picker"
              value={editCardDate}
              onChange={(e) => setEditCardDate(e?.target?.value)}
              type="date"
              name="Due Date"
            />
            <select
              className="select-color"
              onChange={(e) => setEditCardColor(e?.target?.value)}
              value={editCardColor}
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
                    <label>
                      <input
                        type="checkbox"
                        name={user?.name}
                        value={user?._id}
                        defaultChecked={editCardUsers?.some((userObj) =>
                          userObj?._id === user?._id ? true : false
                        )}
                        onChange={handleChange}
                      />
                    </label>
                    <div className="assign-user-list-container">
                      <img
                        className="user-avatar-image assign-user-image"
                        alt="img"
                        src={user?.photo}
                        title={user?.name}
                      />
                      <div>
                        <div className="assign-user-list-name">
                          {user?.name}
                        </div>
                        <div className="assign-user-list-email">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="assigned-user-container">
              {editCardUsers?.map((person, index) => (
                <div className="admin-avatar-container" key={index}>
                  <img
                    className="admin-avatar-image"
                    alt="img"
                    src={person?.photo}
                    title={person?.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="save-delete-container">
            <button className="modal-board-button" type="submit">
              Save
            </button>
            <div
              className="delete-button"
              onClick={() => {
                const now = Date.now();
                const deleteObj = {
                  columnId: currentCard.columnId,
                  cardId: currentCard.id,
                };
                handleDeleteCardLocal(deleteObj);
                handleDeleteCardServer(
                  user.token,
                  currentBoardId,
                  currentCard.id
                );
                addActivity(user.token, currentBoardId, {
                  info: {
                    title: "deleted card",
                    user: user.name,
                    cardTitle: currentCard.title,
                    date: dateFormat(now, "mmm dS, yyyy"),
                    time: dateFormat(now, "h:MM TT"),
                  },
                  boardId: currentBoardId,
                });
                socket.emit("delete-card", deleteObj);
                closeModal();
              }}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    currentBoardId: state.board.selectBoard.id,
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
    notify: (token, boardId, notificationObj) =>
      dispatch(sendNotification(token, boardId, notificationObj)),
    notifyOff: (bool) => dispatch(turnOffNotify(bool)),
    addActivity: (token, boardId, data) =>
      dispatch(createActivity(token, boardId, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCardModal);
