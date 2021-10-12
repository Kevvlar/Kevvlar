import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import TaskItem from "../task/Task";

import "./taskList.css";

const TaskList = ({ length }) => (
  <InfiniteScroll dataLength={length} hasMore={true} height={350}>
    <TaskItem />
    <TaskItem />
    <TaskItem />
  </InfiniteScroll>
);

export default TaskList;
