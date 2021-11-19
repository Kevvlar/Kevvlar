import { ADD_NEW_COLUMN_ORDER_LOCAL } from "./columnOrderTypes";

const initialState = {
  loading: false,
  error: "",
  orders: [],
};

export const columnOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COLUMN_ORDER_LOCAL:
      return {
        ...state,
        orders: [...state.orders, action.payLoad],
      };
    default:
      return state;
  }
};

export default columnOrderReducer;
