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
import { withRouter } from "react-router-dom";

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
  currentColumn,
  admins,
  members,
  notify,
  notifyOff,
  addActivity,
  history,
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
      columnId: currentColumn.id,
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
        const now = Date();
        notify(user.token, currentBoardId, {
          user: newCheckedUsers[i]._id,
          type: "assign",
          info: {
            boardId: currentBoardId,
            date: dateFormat(now, "mmm dS, yyyy"),
            realTime: now,
            cardTitle: cardObj.title,
            cardId: cardObj.id,
            title: "Assigned User to Card",
          },
        });
        addActivity(user.token, currentBoardId, {
          info: {
            title: "Assigned User to Card",
            user: user.name,
            userAssigned: newCheckedUsers[i].name,
            card: {
              id: currentCard.id,
              title: editCardTitle,
            },
            date: dateFormat(now, "mmm dS, yyyy"),
            realTime: now,
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
    history.push(`/boards/${currentBoardId}`);
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

  const pasteEvent = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        if (text.includes("iframe" && "figma")) {
          const editor = document
            .getElementById("ql-editor-big")
            .getElementsByTagName("div")[1]
            .getElementsByTagName("div")[0];
          const figmasrc = text.match(/src=([^\s]*)\s/)[1]; // removed /src"\"=([^\s]*)\s/
          const finalsrc = figmasrc.substring(1, figmasrc.length - 1);
          const figmaObject = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="70%" src="${finalsrc}" allowfullscreen></iframe>`;
          editor.insertAdjacentHTML("beforeend", figmaObject);

          for (const p of document.querySelectorAll("p")) {
            if (p.textContent.includes("iframe" && "figma")) {
              p.remove();
            }
          }
        } else {
          console.log("Not a figma iframe");
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });
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
          <div className="modal-body-description" onPaste={pasteEvent}>
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
                const now = Date();
                const deleteObj = {
                  columnId: currentColumn.id,
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
                    card: {
                      id: currentCard.id,
                      title: editCardTitle,
                    },
                    date: dateFormat(now, "mmm dS, yyyy"),
                    realTime: now,
                  },
                  boardId: currentBoardId,
                });
                socket.emit("delete-card", deleteObj);
                history.push(`/boards/${currentBoardId}`);
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
    currentColumn: state.column.selectColumn,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditCardModal));
