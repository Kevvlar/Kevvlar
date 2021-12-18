import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";

// import { LoadingIcon } from "../../assets/svg/iconlibrary";

import {
  setColumnModal,
  editBoardServer,
  changeColumnsOrderLocal,
  editColumnServer,
  changeCardsOrderLocal,
  handleChangeCardColumnLocal,
  editCardServer,
  fetchBoards,
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
  user,
  boardId,
  columnId,
  cardId,
  addNewColumnModal,
  columns,
  columnsState,
  getBoards,
  columnsOrder,
  updateBoardServer,
  updateColumnsOrderLocal,
  updateCardsOrderLocal,
  updateCardsOrderServer,
  changeCardColumnLocal,
  updateCardServer,
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
      updateColumnsOrderLocal(newColumnOrder);
      updateBoardServer(boardId, { columnsOrder: newColumnOrder }, user.token);
      getBoards(user.token);
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
      updateCardsOrderLocal(newCardOrder);
      updateCardsOrderServer(user.token, boardId, columnId, {
        cardsOrder: newCardOrder,
      });
    }

    // move card into another column
    if (source.droppableId !== destination.droppableId && type === "card") {
      const targetColumn = columns.find((column) =>
        column.id === destination.droppableId ? column : null
      );
      const targetColumnCardOrder = targetColumn.cardsOrder;
      const newTargetColumnCardOrder = [...targetColumnCardOrder];
      newTargetColumnCardOrder.splice(destination.index, 0, draggableId);
      changeCardColumnLocal(source.droppableId, {
        destinationColumn: destination.droppableId,
        newOrder: newTargetColumnCardOrder,
      });
      updateCardsOrderServer(user.token, boardId, destination.droppableId, {
        cardsOrder: newTargetColumnCardOrder,
      });
      updateCardServer(user.token, boardId, cardId, {
        columnId: destination.droppableId,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
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
  );
};

const mapStateToProps = (state) => {
  return {
    columnsOrder: state.board.selectBoard.columnsOrder,
    columns: state.column.columns,
    columnsState: state.column.loading,
    boardId: state.board.selectBoard.id,
    columnId: state.column.selectColumn.id,
    cardId: state.column.selectCard.id,
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBoards: (token) => dispatch(fetchBoards(token)),
    addNewColumnModal: () => dispatch(setColumnModal()),
    updateBoardServer: (boardId, boardObj, token) =>
      dispatch(editBoardServer(boardId, boardObj, token)),
    updateColumnsOrderLocal: (changeObj) =>
      dispatch(changeColumnsOrderLocal(changeObj)),
    updateCardsOrderLocal: (order) => dispatch(changeCardsOrderLocal(order)),
    updateCardsOrderServer: (token, boardId, columnId, columnObj) =>
      dispatch(editColumnServer(token, boardId, columnId, columnObj)),
    changeCardColumnLocal: (sourceColumn, changeObj) =>
      dispatch(handleChangeCardColumnLocal(sourceColumn, changeObj)),
    updateCardServer: (token, boardId, cardId, cardObj) =>
      dispatch(editCardServer(token, boardId, cardId, cardObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHolder);
