import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import {
  setColumnModal,
  changeColumnsOrderLocal,
  changeCardOrderLocal,
  removeCardFromSourceColumnLocal,
  changeCardColumnLocal,
} from "../../redux/index";

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
  columnsOrder,
  changesColumnsOrder,
  changeCardOrder,
  removeCardFromSourceColumn,
  changeCardColumn,
}) => {
  const onDragEnd = (result) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) {
      return;
    }

    // move column
    if (type === "column" && destination.index !== source.index) {
      const newColumnOrder = Array.from(columnsOrder);
      const [reOrderedItem] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, reOrderedItem);
      changesColumnsOrder(newColumnOrder);
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
      const newCardOrder = Array.from(currentColumn.cardsOrder);
      const [reOrderedCards] = newCardOrder.splice(source.index, 1);
      newCardOrder.splice(destination.index, 0, reOrderedCards);
      changeCardOrder(newCardOrder);
    }

    // move card into another column
    if (source.droppableId !== destination.droppableId && type === "card") {
      const targetColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );

      const targetColumnCardOrder = targetColumn.cardsOrder;
      const newTargetColumnCardOrder = [...targetColumnCardOrder];
      newTargetColumnCardOrder.splice(destination.index, 0, draggableId);
      // console.log(newTargetColumnCardOrder);
      // console.log("D: ", destination);
      // console.log("S: ", source);
      // console.log("DR ID: ", draggableId);
      removeCardFromSourceColumn(source.droppableId);
      changeCardColumn({
        destinationColumn: destination.droppableId,
        newOrder: newTargetColumnCardOrder,
      });
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
              {mapOrder(columns, columnsOrder, "id").map((column, index) => (
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

const mapStateToProps = (state) => {
  return {
    columnsOrder: state.board.selectColumnsOrder,
    columns: state.column.columnsByBoard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewColumnModal: () => dispatch(setColumnModal()),
    changesColumnsOrder: (order) => dispatch(changeColumnsOrderLocal(order)),
    changeCardOrder: (order) => dispatch(changeCardOrderLocal(order)),
    removeCardFromSourceColumn: (sourceColumnId) =>
      dispatch(removeCardFromSourceColumnLocal(sourceColumnId)),
    changeCardColumn: (changeObj) => dispatch(changeCardColumnLocal(changeObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHolder);
