import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BoardItem from "../board-item/BoardItem";

import "./boardlist.css";

const BoardList = () => {
  const [boards, setBoards] = useState([
    {
      title: "Hello",
    },
    {
      title: "Hi",
    },
    {
      title: "Kevvlar",
    },
  ]);

  // const fetchBoards = () => {
  //   const token = localStorage.getItem("token");
  //   fetch("http://localhost:8000/api/v1/boards", {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((serverData) => {
  //       if (serverData.status === "success") {
  //         setBoards(serverData.data.boards);
  //       } else if (serverData.data.status === "error") {
  //         alert("Error signing user up; please try signing up again");
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error.message);
  //     });
  // };

  useEffect(() => {}, []);

  return (
    <div className="sidenav-left-board-list">
      <InfiniteScroll dataLength={boards.length} hasMore={true} height={300}>
        {boards.map((board, index) => (
          <BoardItem key={index} board={board} />
        ))}
      </InfiniteScroll>
      <div
        onClick={() => alert("feature coming soon...")}
        className="sidenav-left-add-new-board-button"
      >
        + Add new board
      </div>
    </div>
  );
};

export default BoardList;
