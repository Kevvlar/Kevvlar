import React from "react";
import { FaTimes } from "react-icons/fa";

import "./task.css";

const TaskItem = () => (
  <div className="task-item-holder">
    <div className="task-item">
      Card title - 08/17/2021
      <div className="task-item-board">Feature 3</div>
    </div>
    <FaTimes className="task-cancel-icon" />
  </div>
);

export default TaskItem;
