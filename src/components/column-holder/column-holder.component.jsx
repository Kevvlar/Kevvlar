import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Column from "../column/column.component";

import "./column-holder.styles.css";

class ColumnHolder extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: {
        "task-1": { id: "task-1", title: "Eat", content: "Eat launch" },
        "task-2": { id: "task-2", title: "Movie", content: "Watch my show" },
        "task-3": { id: "task-3", title: "Phone", content: "Charge my phone" },
        "task-4": { id: "task-4", title: "Cook", content: "Cook dinner" },
        "task-5": { id: "task-5", title: "Code", content: "Write code" },
        "task-6": { id: "task-6", title: "Frontend", content: "Fix frontend" },
      },
      columns: {
        "column-1": {
          id: "column-1",
          title: "Todo",
          taskIds: ["task-1", "task-2"],
        },
        "column-2": {
          id: "column-2",
          title: "In progres",
          taskIds: ["task-3", "task-4"],
        },
        "column-3": {
          id: "column-3",
          title: "Done",
          taskIds: ["task-5", "task-6"],
        },
      },
      columnOrder: ["column-1", "column-2", "column-3"],
    };
  }

  componentDidUpdate() {
    // console.log("Column Order: ", this.state.columnOrder);
    // console.log("Tasks: ", this.state.tasks);
    // console.log("Colums: ", this.state.columns);
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.inndex === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };

      this.setState(newState);
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishedTaskIds = Array.from(finish.taskIds);
    finishedTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishedTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <ScrollContainer
        className="scroll-container"
        vertical={true}
        horizontal={true}
      >
        <DragDropContext onDragEnd={this.onDragEnd}>
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
                {this.state.columnOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => this.state.tasks[taskId]
                  );

                  return (
                    <Column
                      showModal={this.props.showModal}
                      key={columnId}
                      column={column}
                      tasks={tasks}
                      index={index}
                      setCardActionType={this.props.setCardActionType}
                      setColumnActionType={this.props.setColumnActionType}
                    />
                  );
                })}
                {provided.placeholder}
                <button className="new-column-button">+ Add New Column</button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollContainer>
    );
  }
}

export default ColumnHolder;
