import {
  FETCH_COLUMN_ORDER_REQUEST,
  FETCH_COLUMN_ORDER_SUCCESS,
  FETCH_COLUMN_ORDER_FAILURE,
  UPDATE_COLUMN_ORDER_REQUEST,
  UPDATE_COLUMN_ORDER_SUCCESS,
  UPDATE_COLUMN_ORDER_FAILURE,
} from "./columnOrderTypes";
import axios from "axios";

export const fetchColumnOrderRequest = () => {
  return {
    type: FETCH_COLUMN_ORDER_REQUEST,
  };
};

export const fetchColumnOrderSuccess = (columnOrder) => {
  return {
    type: FETCH_COLUMN_ORDER_SUCCESS,
    payLoad: columnOrder,
  };
};

export const fetchColumnOrderFailure = (error) => {
  return {
    type: FETCH_COLUMN_ORDER_FAILURE,
    payLoad: error,
  };
};

export const updateColumnOrderRequest = () => {
  return {
    type: UPDATE_COLUMN_ORDER_REQUEST,
  };
};

export const updateColumnOrderSuccess = (columnOrder) => {
  return {
    type: UPDATE_COLUMN_ORDER_SUCCESS,
    payLoad: columnOrder,
  };
};

export const updateColumnOrderFailure = (error) => {
  return {
    type: UPDATE_COLUMN_ORDER_FAILURE,
    payLoad: error,
  };
};

export const fetchColumnOrder = (boardId) => {
  return (dispatch) => {
    dispatch(fetchColumnOrderRequest());
    axios
      .get("http://localhost:8000/api/v1/columnorder", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
        params: { board: boardId },
      })
      .then((response) => {
        const order = response.data.data.order.columnOrder;
        dispatch(fetchColumnOrderSuccess(order));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchColumnOrderFailure(errorMsg));
      });
  };
};

export const updateColumnOrder = (boardId, newOrder) => {
  return (dispatch) => {
    dispatch(updateColumnOrderRequest());
    axios
      .patch("http://localhost:8000/api/v1/columnorder", newOrder, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
        params: { board: boardId },
      })
      .then((response) => {
        const columnOrder = response.data.data.order.columnOrder;
        dispatch(updateColumnOrderSuccess(columnOrder));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateColumnOrderFailure(errorMsg));
      });
  };
};
