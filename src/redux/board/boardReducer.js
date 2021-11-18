import {} from "./boardTypes";

const initialState = {
  currentBoardId: "",
  currentBoardTitle: "",
  loading: false,
  error: "",
  boards: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default boardReducer;
