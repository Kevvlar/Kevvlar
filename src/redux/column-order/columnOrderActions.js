import {
  FETCH_COLUMN_ORDER_REQUEST,
  FETCH_COLUMN_ORDER_SUCCESS,
  FETCH_COLUMN_ORDER_FAILURE,
  UPDATE_COLUMN_ORDER_REQUEST,
  UPDATE_COLUMN_ORDER_SUCCESS,
  UPDATE_COLUMN_ORDER_FAILURE,
  UPDATE_COLUMN_ORDER_LOCAL,
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

export const updateColumnOrderSuccess = () => {
  return {
    type: UPDATE_COLUMN_ORDER_SUCCESS,
  };
};

export const updateColumnOrderFailure = (error) => {
  return {
    type: UPDATE_COLUMN_ORDER_FAILURE,
    payLoad: error,
  };
};

export const updateColumnOrderLocal = (columnOrder) => {
  return {
    type: UPDATE_COLUMN_ORDER_LOCAL,
    payLoad: columnOrder,
  };
};

export const fetchColumnOrder = (boardId) => {
  return (dispatch) => {
    dispatch(fetchColumnOrderRequest());
    axios
      .get("http://localhost:8000/api/v1/columnorder", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { board: boardId },
      })
      .then((response) => {
        dispatch(updateColumnOrderSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateColumnOrderFailure(errorMsg));
      });
  };
};
