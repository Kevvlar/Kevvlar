import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

import "./board-modal.styles.css";

const BoardModal = ({ hideModal, type, showLeftSideNav, getBoardId }) => {
  const [boardName, setBoardName] = useState("");
  const [editBoardName, setEditBoardName] = useState("");

  const handleChangeCreateBoard = (event) => {
    setBoardName(event.target.value);
  };

  const handleChangeEditBoard = (event) => {
    setEditBoardName(event.target.value);
  };

  const handleCreateBoard = () => {
    const data = { title: boardName };
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/v1/boards", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setBoardName("");
          hideModal();
          showLeftSideNav();
        } else if (data.status === "error") {
          alert("Error creating new board.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditBoard = () => {
    const data = { title: editBoardName };
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/v1/boards/${getBoardId()}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setEditBoardName("");
          hideModal();
        } else if (data.status === "error") {
          alert("Error creating new board.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addBoard = () => (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Add New Board</h2>
      <input
        className="modal-board-text"
        type="text"
        name="boardName"
        placeholder="New Board"
        value={boardName}
        onChange={handleChangeCreateBoard}
      />

      <button className="modal-board-button" onClick={handleCreateBoard}>
        Save
      </button>
    </div>
  );

  const editBoard = () => (
    <div className="modal-board-body">
      <h2 className="modal-board-title">Edit Board</h2>
      <input
        className="modal-board-text"
        type="text"
        name="editBoardName"
        placeholder="Edit Board"
        value={editBoardName}
        onChange={handleChangeEditBoard}
      />
      <button className="modal-board-button" onClick={handleEditBoard}>
        Save
      </button>
    </div>
  );

  return (
    <div className="modal-board">
      <div className="close-icon-container">
        <FaTimes onClick={hideModal} className="close-icon" />
      </div>
      {type === "add" ? addBoard() : null}
      {type === "edit" ? editBoard() : null}
    </div>
  );
};

export default BoardModal;
