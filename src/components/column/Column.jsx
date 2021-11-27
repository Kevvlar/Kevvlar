import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import {
  setCardModal,
  setColumnModal,
  setCurrentColumnData,
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
  getColumnData,
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
            <div className="column-handle" {...provided.dragHandleProps}>
              <p className="column-header-title">{column.title}</p>
            </div>
            <div className="column-header-icon-container">
              <FaTrash
                onClick={() => {
                  getColumnData({
                    id: column.id,
                    title: column.title,
                  });
                  deleteColumnModal();
                }}
                className="column-header-trash-icon"
              />
              <FaEdit
                onClick={() => {
                  getColumnData({
                    id: column.id,
                    title: column.title,
                  });
                  editColumnModal();
                }}
                className="column-header-edit-icon"
              />
            </div>
          </div>
          <Droppable droppableId={column.id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {mapOrder(column.cards, column.cardsOrder, "id").map(
                  (card, index) => (
                    <Card
                      key={card.id}
                      card={card}
                      index={index}
                      columnId={column.id}
                      columnTitle={column.title}
                    />
                  )
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            onClick={() => {
              getColumnData({
                id: column.id,
                title: column.title,
              });
              addNewCardModal();
            }}
            className="new-card-button"
          >
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
    getColumnData: (columnObj) => dispatch(setCurrentColumnData(columnObj)),
  };
};

export default connect(null, mapDispatchToProps)(Column);
