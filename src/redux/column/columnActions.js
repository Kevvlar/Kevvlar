import {
  FETCH_COLUMNS_REQUEST,
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILURE,
  ADD_COLUMN_REQUEST,
  ADD_COLUMN_SUCCESS,
  ADD_COLUMN_FAILURE,
  EDIT_COLUMN_REQUEST,
  EDIT_COLUMN_SUCCESS,
  EDIT_COLUMN_FAILURE,
  DELETE_COLUMN_REQUEST,
  DELETE_COLUMN_SUCCESS,
  DELETE_COLUMN_FAILURE,
  SET_CURRENT_COLUMN_ID_AND_TITLE,
  DELETE_COLUMN_BY_BOARD,
  UPDATE_CARD_ORDER_WITHIN_COLUMN_REQUEST,
  UPDATE_CARD_ORDER_WITHIN_COLUMN_SUCCESS,
  UPDATE_CARD_ORDER_WITHIN_COLUMN_FAILURE,
} from "./columnTypes";
import axios from "axios";
import { fetchColumnOrder } from "../column-order/columnOrderActions";

export const fetchColumnsRequest = () => {
  return {
    type: FETCH_COLUMNS_REQUEST,
  };
};

export const fetchColumnSuccess = (columns) => {
  return {
    type: FETCH_COLUMNS_SUCCESS,
    payLoad: columns,
  };
};

export const fetchColumnFailure = (error) => {
  return {
    type: FETCH_COLUMNS_FAILURE,
    payLoad: error,
  };
};

export const addNewColumnRequest = () => {
  return {
    type: ADD_COLUMN_REQUEST,
  };
};

export const addNewColumnSuccess = () => {
  return {
    type: ADD_COLUMN_SUCCESS,
  };
};

export const addNewColumnFailure = (error) => {
  return {
    type: ADD_COLUMN_FAILURE,
    payLoad: error,
  };
};

export const editColumnRequest = () => {
  return {
    type: EDIT_COLUMN_REQUEST,
  };
};

export const editColumnSuccess = () => {
  return {
    type: EDIT_COLUMN_SUCCESS,
  };
};

export const editColumnFailure = (error) => {
  return {
    type: EDIT_COLUMN_FAILURE,
    payLoad: error,
  };
};

export const deleteColumnRequest = () => {
  return {
    type: DELETE_COLUMN_REQUEST,
  };
};

export const deleteColumnSuccess = () => {
  return {
    type: DELETE_COLUMN_SUCCESS,
  };
};

export const deleteColumnFailure = (error) => {
  return {
    type: DELETE_COLUMN_FAILURE,
    payLoad: error,
  };
};

export const setCurrentColumnIdAndTitle = (data) => {
  return {
    type: SET_CURRENT_COLUMN_ID_AND_TITLE,
    payLoad: data,
  };
};

export const deleteColumnByBoard = () => {
  return {
    type: DELETE_COLUMN_BY_BOARD,
  };
};

export const updateCardOrderWithinColumnRequest = () => {
  return {
    type: UPDATE_CARD_ORDER_WITHIN_COLUMN_REQUEST,
  };
};

export const updateCardOrderWithinColumnSuccess = () => {
  return {
    type: UPDATE_CARD_ORDER_WITHIN_COLUMN_SUCCESS,
  };
};

export const updateCardOrderWithinColumnFailure = (error) => {
  return {
    type: UPDATE_CARD_ORDER_WITHIN_COLUMN_FAILURE,
    payLoad: error,
  };
};

export const fetchColumns = (boardId) => {
  return (dispatch) => {
    dispatch(fetchColumnsRequest());
    axios
      .get("http://localhost:8000/api/v1/columns", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
        params: { board: boardId },
      })
      .then((response) => {
        const columns = response.data.data.columns;
        dispatch(fetchColumnSuccess(columns));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchColumnFailure(errorMsg));
      });
  };
};

export const addColumn = (data, boardId) => {
  return (dispatch) => {
    dispatch(addNewColumnRequest());
    axios
      .post("http://localhost:8000/api/v1/columns", data, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
      })
      .then((response) => {
        dispatch(fetchColumns(boardId));
        dispatch(fetchColumnOrder(boardId));
        dispatch(addNewColumnSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(addNewColumnFailure(errorMsg));
      });
  };
};

export const editColumn = (data, columnId, boardId) => {
  return (dispatch) => {
    dispatch(editColumnRequest());
    axios
      .patch(`http://localhost:8000/api/v1/columns/${columnId}`, data, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
      })
      .then(() => {
        dispatch(editColumnSuccess());
        dispatch(fetchColumns(boardId));
        dispatch(fetchColumnOrder(boardId));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(editColumnFailure(errorMsg));
      });
  };
};

export const deleteColumn = (columnId, boardId) => {
  return (dispatch) => {
    dispatch(deleteColumnRequest());
    axios
      .delete(`http://localhost:8000/api/v1/columns/${columnId}`, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
        params: { board: boardId },
      })
      .then(() => {
        dispatch(deleteColumnSuccess());
        dispatch(fetchColumns(boardId));
        dispatch(fetchColumnOrder(boardId));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteColumnFailure(errorMsg));
      });
  };
};

export const updateCardOrderWithinColumn = (columnId, boardId, order) => {
  return (dispatch) => {
    dispatch(updateCardOrderWithinColumnRequest());
    axios
      .patch(
        `http://localhost:8000/api/v1/columns/changecardorderwithincolumn/${columnId}`,
        order,
        {
          headers: {
            "content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
          },
        }
      )
      .then(() => {
        dispatch(fetchColumns(boardId));
        dispatch(updateCardOrderWithinColumnSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(updateCardOrderWithinColumnFailure(errorMsg));
      });
  };
};
