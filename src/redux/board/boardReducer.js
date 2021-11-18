import { ADD_NEW_BOARD_LOCAL } from "./boardTypes";

const initialState = {
  error: "",
  boards: [],
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_BOARD_LOCAL:
      return {
        ...state,
        boards: [...state.boards, action.payLoad],
      };

    default:
      return state;
  }
};

export default boardReducer;
