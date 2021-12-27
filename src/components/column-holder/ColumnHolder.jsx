import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import Column from "../column/Column";

import "./columnHolder.css";

// import { LoadingIcon } from "../../assets/svg/iconlibrary";

import {
  setColumnModal,
  changeColumnsOrderLocal,
  editColumnServer,
  changeColumnsOrderServer,
  changeCardsOrderLocal,
  changeCardsOderIo,
  handleChangeCardColumnLocal,
  handleChangeCardColumnIO,
  editCardServer,
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

const ColumnHolder = ({
  columns,
  columnsOrder,
  updateColumnsOrderLocal,
  updateBoardServer,
  boardId,
  user,
  updateCardsOrderLocal,
  updateCardsOrderIO,
  updateCardsOrderServer,
  columnId,
  changeCardColumnLocal,
  changeCardColumnIo,
  updateCardServer,
  selectCard,
  addNewColumnModal,
}) => {
  const { boardId: selectBoardId } = useParams();
  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io("https://kevvlar.herokuapp.com");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("join-board", selectBoardId);
    return () => {
      socket.off("join-board", selectBoardId);
    };
  }, [socket, selectBoardId]);

  useEffect(() => {
    if (socket == null) return;

    const handler = (change) => {
      updateColumnsOrderLocal(change);
    };

    socket.on("receive-columns-order", handler);

    return () => {
      socket.off("receive-columns-order", handler);
    };
  }, [socket, updateColumnsOrderLocal]);

  useEffect(() => {
    if (socket == null) return;

    const handler = (changeObj) => {
      updateCardsOrderIO(changeObj);
    };

    socket.on("receive-cards-order-change", handler);

    return () => {
      socket.off("receive-cards-order-change", handler);
    };
  }, [socket, updateCardsOrderIO]);

  useEffect(() => {
    if (socket == null) return;

    const handler = (changeObj) => {
      console.log(changeObj);
      changeCardColumnIo(changeObj);
    };

    socket.on("receive-card-column-change", handler);

    return () => {
      socket.off("receive-card-column-change", handler);
    };
  }, [socket, changeCardColumnIo]);

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
      socket.emit("columns-order-change", newColumnOrder);
      updateBoardServer(boardId, { columnsOrder: newColumnOrder }, user.token);
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
      socket.emit("cards-order-change", {
        columnId: columnId,
        cardsOrder: newCardOrder,
      });
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
      socket.emit("card-column-change", {
        card: selectCard,
        cardId: selectCard.id,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        newOrder: newTargetColumnCardOrder,
      });
      updateCardsOrderServer(user.token, boardId, destination.droppableId, {
        cardsOrder: newTargetColumnCardOrder,
      });
      updateCardServer(user.token, boardId, selectCard.id, {
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
    changeCardColumnIo: (changeObj) =>
      dispatch(handleChangeCardColumnIO(changeObj)),
    updateCardServer: (token, boardId, cardId, cardObj) =>
      dispatch(editCardServer(token, boardId, cardId, cardObj)),
    updateCardsOrderIO: (changeObj) => dispatch(changeCardsOderIo(changeObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnHolder);
