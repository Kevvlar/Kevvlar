import {} from "./columnTypes";

const initialState = {
  currentColumnId: "",
  currentColumnTitle: "",
  loading: false,
  error: "",
  columns: [],
  columnsByBoard: [],
};

const columnReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default columnReducer;
