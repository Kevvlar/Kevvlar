import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { setCardModal, setColumnModal } from "../../redux";

import Card from "../card/Card";

import "./column.css";
import { DELETE, EDIT } from "../../redux/modal/modalTypes";

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
                  onClick={this.props.deleteColumnModal}
                  className="column-header-trash-icon"
                />
                <FaEdit
                  onClick={this.props.editColumnModal}
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
                    <Card key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <button
              onClick={this.props.addNewCardModal}
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

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCardModal: () => dispatch(setCardModal()),
    editColumnModal: () => dispatch(setColumnModal(EDIT)),
    deleteColumnModal: () => dispatch(setColumnModal(DELETE)),
  };
};

export default connect(null, mapDispatchToProps)(Column);
