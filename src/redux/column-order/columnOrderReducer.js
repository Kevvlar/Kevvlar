import {
  ADD_NEW_COLUMN_ORDER_LOCAL,
  ADD_NEW_COLUMN_TO_COLUMN_ORDER_LOCAL,
  GET_COLUMN_ORDER_BY_BOARD_LOCAL,
} from "./columnOrderTypes";

const initialState = {
  loading: false,
  error: "",
  columnOrderByBoard: {},
  orders: [],
};

export const columnOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_COLUMN_ORDER_LOCAL:
      return {
        ...state,
        orders: [...state.orders, action.payLoad],
      };

    case ADD_NEW_COLUMN_TO_COLUMN_ORDER_LOCAL:
      return {
        ...state,
        orders: state.orders.map((orderItem) =>
          orderItem.boardId === action.payLoad.boardId
            ? { ...orderItem, order: [...orderItem.order, action.payLoad.id] }
            : orderItem
        ),
      };

    case GET_COLUMN_ORDER_BY_BOARD_LOCAL:
      return {
        ...state,
        columnOrderByBoard: state.orders.find(
          (order) => order.boardId === action.payLoad
        ),
      };

    default:
      return state;
  }
};

export default columnOrderReducer;
