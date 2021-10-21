import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import { setColumnModal, updateColumnOrder } from "../../redux/index";

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

const ColumnHolder = ({
  addNewColumnModal,
  columns,
  columnOrder,
  updateColumnOrder,
  boardId,
}) => {
  const onDragEnd = (result) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) {
      return;
    }

    // console.log("D: ", destination);
    // console.log("S: ", source);
    // console.log("T: ", type);

    // move column
    if (type === "column" && destination.index !== source.index) {
      const newColumnOrder = Array.from(columnOrder);
      const [reOrderedItem] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, reOrderedItem);

      // send this to column orderState
      updateColumnOrder(boardId, {
        columnOrder: newColumnOrder,
      });
    }

    // move card within column
    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index &&
      type === "card"
    ) {
      const currentColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );
      const newCardOrder = Array.from(currentColumn.cardOrder);
      const [reOrderedCards] = newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, reOrderedCards);

      console.log("Old Within Column: ", currentColumn.cardOrder);
      console.log("New Within Column: ", newCardOrder);
      // console.log(
      //   `Moving this card within its column to index of ${destination.index}`
      // );
    }

    // move card into another column
    if (source.droppableId !== destination.droppableId && type === "card") {
      const targetColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );

      const targetColumnCardOrder = targetColumn.cardOrder;
      const newTargetColumnCardOrder = [...targetColumnCardOrder];
      newTargetColumnCardOrder.splice(destination.index, 0, draggableId);

      console.log("Task order New: ", newTargetColumnCardOrder);
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
              {mapOrder(columns, columnOrder, "_id").map((column, index) => (
                <Column key={column._id} column={column} index={index} />
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

const mapStateToProps = (state) => {
  return {
    columnOrder: state.columnOrder.order,
    columns: state.column.columns,
    boardId: state.board.currentBoardId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewColumnModal: () => dispatch(setColumnModal()),
    updateColumnOrder: (boardId, order) =>
      dispatch(updateColumnOrder(boardId, order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHolder);
