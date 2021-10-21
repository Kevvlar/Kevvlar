import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import {
  setCardModal,
  setColumnModal,
  setCurrentColumnIdAndTitle,
} from "../../redux";

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
  setColumnIdAndTitle,
}) => {
  return (
    <Draggable draggableId={column._id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="column-header-container">
            <div className="column-handle" {...provided.dragHandleProps}>
              <p className="column-header-title">{column.title}</p>
            </div>
            <div className="column-header-icon-container">
              <FaTrash
                onClick={() => {
                  setColumnIdAndTitle({
                    id: column._id,
                    title: column.title,
                  });
                  deleteColumnModal();
                }}
                className="column-header-trash-icon"
              />
              <FaEdit
                onClick={() => {
                  setColumnIdAndTitle({
                    id: column._id,
                    title: column.title,
                  });
                  editColumnModal();
                }}
                className="column-header-edit-icon"
              />
            </div>
          </div>
          <Droppable droppableId={column._id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {mapOrder(column.cards, column.cardOrder, "_id").map(
                  (card, index) => (
                    <Card key={card.id} card={card} index={index} />
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
    setColumnIdAndTitle: (data) => dispatch(setCurrentColumnIdAndTitle(data)),
  };
};

export default connect(null, mapDispatchToProps)(Column);
