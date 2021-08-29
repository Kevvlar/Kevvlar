const initialData = {
  tasks: {
    "task-1": { id: "task-1", title: "Trash", content: "Take out the trash" },
    "task-2": {
      id: "task-2",
      title: "Movie",
      content: "Watch my favourite show",
    },
    "task-3": { id: "task-3", title: "Phone", content: "Charge my phone" },
    "task-4": { id: "task-4", title: "Cook", content: "Cook dinner" },
    "task-5": { id: "task-5", title: "Code", content: "Write code" },
    "task-6": { id: "task-6", title: "Frontend", content: "Finish frontend" },
    "task-7": { id: "task-7", title: "Debug", content: "Debug and test code" },
    "task-8": {
      id: "task-8",
      title: "Publish",
      content: "Publish code to production",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
        "task-8",
      ],
    },
    "column-2": {
      id: "column-2",
      title: "In progres",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Delete",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default initialData;
