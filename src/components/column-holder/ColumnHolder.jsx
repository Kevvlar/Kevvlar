import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { setColumnModal } from "../../redux/index";

import Column from "../column/Column";

import "./columnHolder.css";

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

const ColumnHolder = ({ addNewColumnModal }) => {
  const [columns, setColumns] = useState([
    {
      id: "column-1",
      title: "Todo",
      taskOrder: ["task-1", "task-2"],
      taskIds: [
        { id: "task-1", title: "Eat", content: "Eat launch" },
        { id: "task-2", title: "Movie", content: "Watch my show" },
      ],
    },
    {
      id: "column-2",
      title: "In progress",
      taskOrder: ["task-3", "task-4"],
      taskIds: [
        { id: "task-3", title: "Code", content: "Write code" },
        { id: "task-4", title: "Frontend", content: "Fix frontend" },
      ],
    },
    {
      id: "column-3",
      title: "Done",
      taskOrder: ["task-5", "task-6"],
      taskIds: [
        { id: "task-5", title: "Play", content: "Write code" },
        { id: "task-6", title: "Sleep", content: "Fix frontend" },
      ],
    },
  ]);

  const [columnOrder, setColumnOrder] = useState([
    "column-1",
    "column-2",
    "column-3",
  ]);

  const onDragEnd = (result) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) {
      return;
    }

    // move column
    if (type === "column" && destination.index !== source.index) {
      const newColumnOrder = Array.from(columnOrder);
      const [reOrderedColumn] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, reOrderedColumn);

      // send this to column orderState
      setColumnOrder(newColumnOrder);
    }

    // move card within column
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index &&
      type === "task"
    ) {
      const currentColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );
      const newTaskOrder = Array.from(currentColumn.taskOrder);
      const [reOrderedTask] = newTaskOrder.splice(source.index, 1);
      newTaskOrder.splice(destination.index, 0, reOrderedTask);

      console.log("Old Within Column: ", currentColumn.taskOrder);
      console.log("New Within Column: ", newTaskOrder);
      // console.log(
      //   `Moving this card within its column to index of ${destination.index}`
      // );
    }

    // move card into another column
    if (source.droppableId !== destination.droppableId && type === "task") {
      const targetColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );

      const targetColumnTaskOrder = targetColumn.taskOrder;
      const newTargetColumnTaskOrder = [...targetColumnTaskOrder];
      newTargetColumnTaskOrder.splice(destination.index, 0, draggableId);

      console.log("Task order New: ", newTargetColumnTaskOrder);
      console.log(
        `Moving this card with id: ${draggableId} to index of ${destination.index}`
      );
    }
  };

  return (
    <ScrollContainer
      className="scroll-container"
      vertical={true}
      horizontal={true}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="column-holder"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {mapOrder(columns, columnOrder, "id").map((column, index) => (
                <Column key={column.id} column={column} index={index} />
              ))}
              {provided.placeholder}
              <button onClick={addNewColumnModal} className="new-column-button">
                + Add New Column
              </button>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ScrollContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewColumnModal: () => dispatch(setColumnModal()),
  };
};

export default connect(null, mapDispatchToProps)(ColumnHolder);
