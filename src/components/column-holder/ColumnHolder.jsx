import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

import {
  setColumnModal,
  updateColumnOrder,
  updateColumnOrderLocal,
  updateCardOrderWithinColumn,
  updateCardOrderAndColumn,
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
  columnOrder,
  updateColumnOrder,
  boardId,
  updateOrderLocal,
  updateCardOrderInColumn,
  updateCardOrderAndColumnForeign,
  isLoading,
}) => {
  const onDragEnd = (result) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) {
      return;
    }

    // move column
    if (type === "column" && destination.index !== source.index) {
      const newColumnOrder = Array.from(columnOrder);
      const [reOrderedItem] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, reOrderedItem);

      // send this to column orderState
      updateOrderLocal(newColumnOrder);
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

      updateCardOrderInColumn(destination.droppableId, boardId, {
        cardOrder: newCardOrder,
      });
    }

    // move card into another column
    if (source.droppableId !== destination.droppableId && type === "card") {
      const targetColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );

      const targetColumnCardOrder = targetColumn.cardOrder;
      const newTargetColumnCardOrder = [...targetColumnCardOrder];
      newTargetColumnCardOrder.splice(destination.index, 0, draggableId);

      updateCardOrderAndColumnForeign(source.droppableId, boardId, {
        cardId: draggableId,
        cardOrder: newTargetColumnCardOrder,
        destinationColumnId: destination.droppableId,
      });
    }
  };

  return (
    <ScrollContainer
      className="scroll-container"
      vertical={true}
      horizontal={true}
    >
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
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
                <button
                  onClick={addNewColumnModal}
                  className="new-column-button"
                >
                  + Add New Column
                </button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </ScrollContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    columnOrder: state.columnOrder.order,
    columns: state.column.columns,
    boardId: state.board.currentBoardId,
    boards: state.board.boards,
    isLoading: state.column.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewColumnModal: () => dispatch(setColumnModal()),
    updateColumnOrder: (boardId, order) =>
      dispatch(updateColumnOrder(boardId, order)),
    updateOrderLocal: (order) => dispatch(updateColumnOrderLocal(order)),
    updateCardOrderInColumn: (columnId, boardId, order) =>
      dispatch(updateCardOrderWithinColumn(columnId, boardId, order)),
    updateCardOrderAndColumnForeign: (sourceColumnId, boardId, data) =>
      dispatch(updateCardOrderAndColumn(sourceColumnId, boardId, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHolder);
