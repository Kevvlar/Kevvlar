import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

import {
  setCardModal,
  setColumnModal,
  setCurrentColumnData,
} from "../../redux";

import Card from "../card/Card";

import "./column.css";
import { DELETE, EDIT } from "../../redux/modal/modalTypes";

import { EditIcon, TrashIcon } from "../../assets/svg/iconlibrary";

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
  const [addFinishedClass, setAddFinishedClass] = useState(false);

  useEffect(() => {
    if (column.title.toLowerCase().includes("finished")) {
      setAddFinishedClass(true);
    } else {
      setAddFinishedClass(false);
    }
  }, [setAddFinishedClass, column]);

  // needs to fire on render and after editing/creating a column
  const checkFinished = () => {
    if (column.title.toLowerCase() === "finished") {
      setAddFinishedClass(true);
    } else {
      setAddFinishedClass(false);
    }
  };

  return (
    <Draggable draggableId={column?.id} index={index}>
      {(provided) => (
        <div
          className={addFinishedClass ? "column finished-column" : "column"}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="column-header-container">
            <div className="column-handle" {...provided.dragHandleProps}>
              <p className="column-header-title">{column?.title}</p>
            </div>
            <div className="column-header-icon-container">
              <TrashIcon
                handleDelete={() => {
                  getColumnData(column);
                  deleteColumnModal();
                }}
                className="column-header-trash-icon"
              />
              <EditIcon
                handleEdit={() => {
                  getColumnData(column);
                  editColumnModal();
                  checkFinished();
                }}
                className="column-header-edit-icon"
              />
            </div>
          </div>
          <Droppable droppableId={column?.id} type="card">
            {(provided) => (
              <div
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {mapOrder(column?.cards, column?.cardsOrder, "id").map(
                  (card, index) => (
                    <Card
                      key={card.id}
                      card={card}
                      index={index}
                      column={column}
                    />
                  )
                )}
                {provided.placeholder}
                <button
                  onClick={() => {
                    getColumnData(column);
                    addNewCardModal();
                  }}
                  className={`new-card-button`}
                >
                  + Add New Card
                </button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCardModal: () => dispatch(setCardModal()),
    editColumnModal: () => dispatch(setColumnModal(EDIT)),
    deleteColumnModal: () => dispatch(setColumnModal(DELETE)),
    getColumnData: (columnObj) => dispatch(setCurrentColumnData(columnObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Column);
