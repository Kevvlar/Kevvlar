import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../card/card.component";

import "./column.styles.css";

class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <div
            className="column"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="column-header-container">
              <p {...provided.dragHandleProps} className="column-header-title">
                {this.props.column.title}
              </p>
              <div className="column-header-icon-container">
                <FaTrash
                  onClick={() => {
                    this.props.deleteModalActionType();
                    this.props.showModal();
                  }}
                  className="column-header-trash-icon"
                />
                <FaEdit
                  onClick={() => {
                    this.props.editColumnActionType();
                    this.props.showModal();
                  }}
                  className="column-header-edit-icon"
                />
              </div>
            </div>
            <Droppable droppableId={this.props.column.id} type="task">
              {(provided) => (
                <div
                  className="card-container"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.props.tasks.map((task, index) => (
                    <Card
                      setCardActionType={this.props.setCardActionType}
                      showModal={this.props.showModal}
                      key={task.id}
                      task={task}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button
              onClick={() => {
                this.props.setCardActionType();
                this.props.showModal();
              }}
              className="new-card-button"
            >
              + Add New Card
            </button>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Column;