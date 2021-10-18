import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { setCardModal, setColumnModal } from "../../redux";

import Card from "../card/Card";

import "./column.css";
import { DELETE, EDIT } from "../../redux/modal/modalTypes";

const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
};

const Column = ({
  column,
  index,
  addNewCardModal,
  editColumnModal,
  deleteColumnModal,
}) => {
  return (
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
              <FaTrash
                onClick={deleteColumnModal}
                className="column-header-trash-icon"
              />
              <FaEdit
                onClick={editColumnModal}
                className="column-header-edit-icon"
              />
            </div>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {mapOrder(column.taskIds, column.taskOrder, "id").map(
                  (task, index) => (
                    <Card key={task.id} task={task} index={index} />
                  )
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button onClick={addNewCardModal} className="new-card-button">
            + Add New Card
          </button>
        </div>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCardModal: () => dispatch(setCardModal()),
    editColumnModal: () => dispatch(setColumnModal(EDIT)),
    deleteColumnModal: () => dispatch(setColumnModal(DELETE)),
  };
};

export default connect(null, mapDispatchToProps)(Column);
