import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import ScrollContainer from "react-indiana-drag-scroll";
import dateFormat from "dateformat";

import socket from "../../Socket";

import Column from "../column/Column";

import "./columnHolder.css";

import {
  setColumnModal,
  changeColumnsOrderLocal,
  editColumnServer,
  removeCardFromColumnsOrderServer,
  changeColumnsOrderServer,
  changeCardsOrderLocal,
  handleChangeCardColumnLocal,
  editCardServer,
  createActivity,
} from "../../redux/index";

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

const enableScrolling = () => {
  // var parent = document.getElementsByClassName("scroll-enabled")[0];
  // parent.classList.add('indiana-scroll-container');
  // parent.classList.remove('testing');
  // parent.classList.add('indiana-scroll-container--hide-scrollbars');
};

const disableScrolling = () => {
  // var parent = document.getElementsByClassName("scroll-enabled")[0];
  // parent.classList.remove('indiana-scroll-container');
  // parent.classList.add('testing');
  // parent.classList.remove('indiana-scroll-container--hide-scrollbars');
};

const ColumnHolder = ({
  columns,
  columnsOrder,
  updateColumnsOrderLocal,
  updateBoardServer,
  board,
  user,
  updateCardsOrderLocal,
  updateCardsOrderServer,
  columnId,
  changeCardColumnLocal,
  updateCardServer,
  selectCard,
  addNewColumnModal,
  removecardFromColumn,
  addActivity,
}) => {
  const onDragEnd = (result) => {
    enableScrolling();
    const now = Date.now();
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
      updateBoardServer(board.id, { columnsOrder: newColumnOrder }, user.token);
      socket.emit("change-columns-order", newColumnOrder);
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
      updateCardsOrderServer(user.token, board.id, columnId, {
        cardsOrder: newCardOrder,
      });
      addActivity(user.token, board.id, {
        info: {
          title: "order changed",
          columnTitle: currentColumn.title,
          cardTitle: selectCard.title,
          date: dateFormat(now, "mmm dS, yyyy"),
          time: dateFormat(now, "h:MM TT"),
          user: user.name
        },
        boardId: board.id,
      });
      socket.emit("change-cards-order", {
        columnId: columnId,
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
      removecardFromColumn(user.token, board.id, source.droppableId, {
        cardId: draggableId,
      });
      updateCardsOrderServer(user.token, board.id, destination.droppableId, {
        cardsOrder: newTargetColumnCardOrder,
      });
      updateCardServer(user.token, board.id, selectCard.id, {
        columnId: destination.droppableId,
      });
      addActivity(user.token, board.id, {
        info: {
          title: "dragged card",
          columnTitle: targetColumn.title,
          cardTitle: selectCard.title,
          date: dateFormat(now, "mmm dS, yyyy"),
          time: dateFormat(now, "h:MM TT"),
          user: user.name,
        },
        boardId: board.id,
      });
      socket.emit("change-card-column", {
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        card: selectCard,
        cardId: selectCard.id,
        cardsOrder: newTargetColumnCardOrder,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={disableScrolling}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="column-holder"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <ScrollContainer
              className="scroll-enabled"
              ignoreElements=".card, .column-header-container"
            >
              {mapOrder(columns, columnsOrder, "id").map((column, index) => (
                <Column key={column.id} column={column} index={index} />
              ))}
              {provided.placeholder}
              <button
                onClick={() => {
                  addNewColumnModal();
                }}
                className="new-column-button"
              >
                + Add New Column
              </button>
            </ScrollContainer>
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
    board: state.board.selectBoard,
    columnId: state.column.selectColumn.id,
    selectCard: state.column.selectCard,
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewColumnModal: () => dispatch(setColumnModal()),
    updateBoardServer: (boardId, boardObj, token) =>
      dispatch(changeColumnsOrderServer(boardId, boardObj, token)),
    updateColumnsOrderLocal: (changeObj) =>
      dispatch(changeColumnsOrderLocal(changeObj)),
    updateCardsOrderLocal: (order) => dispatch(changeCardsOrderLocal(order)),
    updateCardsOrderServer: (token, boardId, columnId, columnObj) =>
      dispatch(editColumnServer(token, boardId, columnId, columnObj)),
    changeCardColumnLocal: (sourceColumn, changeObj) =>
      dispatch(handleChangeCardColumnLocal(sourceColumn, changeObj)),
    updateCardServer: (token, boardId, cardId, cardObj) =>
      dispatch(editCardServer(token, boardId, cardId, cardObj)),
    removecardFromColumn: (token, boardId, columnId, columnObj) =>
      dispatch(
        removeCardFromColumnsOrderServer(token, boardId, columnId, columnObj)
      ),
    addActivity: (token, boardId, data) =>
      dispatch(createActivity(token, boardId, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHolder);
