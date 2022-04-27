import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
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
  addNewCardLocal,
  addNewCardServer,
  sendNotification,
  turnOffNotify,
  createActivity,
} from "../../../redux";

const AddCardModal = ({
  closeModal,
  createCardLocal,
  createCardServer,
  user,
  currentColumnId,
  currrentBoardId,
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
    ],
    clipboard: {
      matchVisual: false,
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
    const now = Date.now();
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
    addActivity(user.token, currrentBoardId, {
      info: {
        title: "created card",
        user: user.name,
        cardTitle: cardTitle,
        date: dateFormat(now, "mmm dS, yyyy"),
        time: dateFormat(now, "h:MM TT"),
      },
      boardId: currrentBoardId,
    });

    if (assignedUsers.length > 0) {
      for (let i = 0; i < assignedUsers.length; i++) {
        notify(user.token, currrentBoardId, {
          user: assignedUsers[i]._id,
          type: "assign",
          info: {
            boardId: currrentBoardId,
            date: dateFormat(now, "mmm dS, yyyy"),
            time: dateFormat(now, "h:MM TT"),
            cardTitle: cardTitle,
            title: "Assigned Card",
          },
        });
        addActivity(user.token, currrentBoardId, {
          info: {
            title: "assigned user",
            user: user.name,
            userAssigned: assignedUsers[i].name,
            cardTitle: cardTitle,
            date: dateFormat(now, "mmm dS, yyyy"),
            time: dateFormat(now, "h:MM TT"),
          },
          boardId: currrentBoardId,
        });
        socket.emit("sendNotification", {
          senderId: user._id,
          receiverId: assignedUsers[i]._id,
        });

        if (user._id === assignedUsers[i]._id) {
          notifyOff(true);
        }
      }
    }
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
      const checkedUser = users.find((user) => user._id === e.target.value);
      setAssignUsers([...assignedUsers, checkedUser]);
    } else {
      const unCheckedUser = e.target.value;
      setAssignUsers(
        assignedUsers.filter((user) => user._id !== unCheckedUser)
      );
    }
  };

  const pasteEvent = () => {
    navigator.clipboard.readText()
      .then(text => {
        console.log(text);
        if (text.includes('iframe')) {
          console.log('iframe - detected');

          const editor = document.getElementById('ql-editor-big').getElementsByTagName('div')[1].getElementsByTagName('div')[0];
          const figmasrc = text.match(/src\=([^\s]*)\s/)[1];
          const finalsrc = figmasrc.substring(1,figmasrc.length - 1);
          console.log(finalsrc);
          const figmaObject = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="100%" height="70%" src="${finalsrc}" allowfullscreen></iframe>`;
          console.log(figmaObject);
          // editor.append(figmaObject);
          editor.insertAdjacentHTML('beforeend', figmaObject);

          for (const p of document.querySelectorAll("p")) {
            if (p.textContent.includes("iframe")) {
              p.remove();
            }
          }
        }
        else {
          console.log('no iframe detected');
        }
      })
      .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
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

          <div className="modal-body-description" onPaste={pasteEvent}>
            <ReactQuill
              theme="snow"
              modules={MODULES}
              onChange={rteChange}
              value={cardBody}
              className="big-editor"
              id="ql-editor-big"
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
                    <label>
                      <input
                        type="checkbox"
                        name={user.email}
                        value={user._id}
                        onChange={handleChange}
                      />
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
                        <div className="assign-user-list-email">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="assigned-user-container">
              {assignedUsers.map((person, index) => (
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
    notify: (token, boardId, notificationObj) =>
      dispatch(sendNotification(token, boardId, notificationObj)),
    notifyOff: (bool) => dispatch(turnOffNotify(bool)),
    addActivity: (token, boardId, data) =>
      dispatch(createActivity(token, boardId, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCardModal);
