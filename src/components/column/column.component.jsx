import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../card/card.component";

import "./column.styles.css";

const Column = ({ column, tasks, index, showModal }) => (
  <Draggable draggableId={column.id} index={index}>
    {(provided) => (
      <div
        className="column"
        {...provided.draggableProps}
        ref={provided.innerRef}
      >
        <div className="column-header-container">
          <p {...provided.dragHandleProps} className="column-header-title">
            {column.title}
          </p>
          <div className="column-header-icon-container">
            <FaTrash className="column-header-trash-icon" />
            <FaEdit className="column-header-edit-icon" />
          </div>
        </div>
        <Droppable droppableId={column.id} type="task">
          {(provided) => (
            <div
              className="card-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task, index) => (
                <Card
                  showModal={showModal}
                  key={task.id}
                  task={task}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <button className="new-card-button">+ Add New Card</button>
            </div>
          )}
        </Droppable>
      </div>
    )}
  </Draggable>
);

export default Column;
