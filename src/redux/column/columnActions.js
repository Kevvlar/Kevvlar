import axios from "axios";
import {
  FETCH_COLUMNS_REQUEST,
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILURE,
  ADD_NEW_COLUMN_LOCAL,
  ADD_NEW_COLUMN_SERVER_FAILURE,
  EDIT_COLUMN_LOCAL,
  EDIT_COLUMN_SERVER_SUCCESS,
  EDIT_COLUMN_SERVER_FAILURE,
  DELETE_COLUMN_LOCAL,
  DELETE_COLUMN_SERVER_SUCCESS,
  DELETE_COLUMN_SERVER_FAILURE,
  CHANGE_CARD_COLUMN_ID,
  CHANGE_CARD_COLUMN_LOCAL,
  ADD_NEW_CARD_LOCAL,
  ADD_NEW_CARD_SERVER_FAILURE,
  DELETE_CARD_LOCAL,
  EDIT_CARD_LOCAL,
  CHANGE_CARD_ORDER_LOCAL,
  REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
  ENTER_CARD_SEARCH_KEY,
  SET_CURRENT_COLUMN_DATA,
  SET_CURRENT_CARD_DATA,
  CLEAR_COLUMNS,
} from "./columnTypes";

import {
  addColumnToColumnsOrderLocal,
  fetchBoards,
  removeColumnFromColumnsOrderLocal,
} from "../index";

// FETCH COLUMNS
export const fetchColumnsRequest = () => {
  return {
    type: FETCH_COLUMNS_REQUEST,
  };
};

export const fetchColumnsSuccess = (columns) => {
  return {
    type: FETCH_COLUMNS_SUCCESS,
    payLoad: columns,
  };
};

export const fetchColumnsFailure = (error) => {
  return {
    type: FETCH_COLUMNS_FAILURE,
    payLoad: error,
  };
};

export const fetchColumns = (token, boardId) => {
  return (dispatch) => {
    dispatch(fetchColumnsRequest());
    axios
      .get("http://localhost:8000/api/v1/columns", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        const columns = response.data.data.columns;
        dispatch(fetchColumnsSuccess(columns));
      })
      .catch((error) => {
        dispatch(fetchColumnsFailure(error.message));
      });
  };
};

// ADD NEW COLUMN
export const addNewColumnLocal = (columnObj) => {
  return {
    type: ADD_NEW_COLUMN_LOCAL,
    payLoad: columnObj,
  };
};

export const handleAddNewColumnLocal = (columnObj) => {
  return (dispatch) => {
    dispatch(addNewColumnLocal(columnObj));
    dispatch(addColumnToColumnsOrderLocal(columnObj.id));
  };
};

export const addNewColumnServerFailure = (error) => {
  return {
    type: ADD_NEW_COLUMN_SERVER_FAILURE,
    payLoad: error,
  };
};

export const createColumnServer = (token, boardId, columnObj) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/api/v1/columns/", columnObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        dispatch(fetchBoards(token));
      })
      .catch((error) => {
        dispatch(addNewColumnServerFailure(error.message));
      });
  };
};

export const editColumnServerSuccess = () => {
  return {
    type: EDIT_COLUMN_SERVER_SUCCESS,
  };
};

export const editColumnServerFailure = (error) => {
  return {
    type: EDIT_COLUMN_SERVER_FAILURE,
    payLoad: error,
  };
};

export const editColumnServer = (token, boardId, columnId, columnObj) => {
  return (dispatch) => {
    dispatch(editColumnServerSuccess());
    axios
      .patch(`http://localhost:8000/api/v1/columns/${columnId}`, columnObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        dispatch(fetchBoards(token));
      })
      .catch((error) => {
        dispatch(editColumnServerFailure(error.message));
      });
  };
};

export const editColumnLocal = (columnObj) => {
  return {
    type: EDIT_COLUMN_LOCAL,
    payLoad: columnObj,
  };
};

export const deleteColumnServerSuccess = () => {
  return {
    type: DELETE_COLUMN_SERVER_SUCCESS,
  };
};

export const deleteColumnServerFailure = (error) => {
  return {
    type: DELETE_COLUMN_SERVER_FAILURE,
    payLoad: error,
  };
};

export const deleteColumnServer = (token, boardId, columnId) => {
  return (dispatch) => {
    dispatch(deleteColumnServerSuccess());
    axios
      .delete(`http://localhost:8000/api/v1/columns/${columnId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        dispatch(fetchBoards(token));
      })
      .catch((error) => {
        dispatch(deleteColumnServerFailure(error.message));
      });
  };
};

export const deleteColumnLocal = (columnId) => {
  return {
    type: DELETE_COLUMN_LOCAL,
    payLoad: columnId,
  };
};

export const handleDeleteColumnLocal = (columnId) => {
  return (dispatch) => {
    dispatch(removeColumnFromColumnsOrderLocal(columnId));
    dispatch(deleteColumnLocal(columnId));
  };
};

export const addNewCardLocal = (cardObj) => {
  return {
    type: ADD_NEW_CARD_LOCAL,
    payLoad: cardObj,
  };
};

export const addNewCardServerFailure = (error) => {
  return {
    type: ADD_NEW_CARD_SERVER_FAILURE,
    payLoad: error,
  };
};

export const addNewCardServer = (token, boardId, cardObj) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/api/v1/cards", cardObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {})
      .catch((error) => {
        dispatch(addNewCardServerFailure(error.message));
      });
  };
};

export const editCardLocal = (cardObj) => {
  return {
    type: EDIT_CARD_LOCAL,
    payLoad: cardObj,
  };
};

export const deleteCardLocal = (deleteObj) => {
  return {
    type: DELETE_CARD_LOCAL,
    payLoad: deleteObj,
  };
};

export const changeCardOrderLocal = (order) => {
  return {
    type: CHANGE_CARD_ORDER_LOCAL,
    payLoad: order,
  };
};

export const removeCardFromSourceColumnLocal = (sourceColumnId) => {
  return {
    type: REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
    payLoad: sourceColumnId,
  };
};

export const changeCardColumnLocal = (changeObj) => {
  return {
    type: CHANGE_CARD_COLUMN_LOCAL,
    payLoad: changeObj,
  };
};

export const changeCardColumnId = (columnId) => {
  return {
    type: CHANGE_CARD_COLUMN_ID,
    payLoad: columnId,
  };
};

export const handleChangeCardColumnLocal = (sourceColumnId, changeObj) => {
  return (dispatch) => {
    dispatch(removeCardFromSourceColumnLocal(sourceColumnId));
    dispatch(changeCardColumnId(changeObj.destinationColumn));
    dispatch(changeCardColumnLocal(changeObj));
  };
};

export const enterCardSearchKey = (keyWord) => {
  return {
    type: ENTER_CARD_SEARCH_KEY,
    payLoad: keyWord,
  };
};

export const clearColumns = () => {
  return {
    type: CLEAR_COLUMNS,
  };
};

export const setCurrentColumnData = (columnObj) => {
  return {
    type: SET_CURRENT_COLUMN_DATA,
    payLoad: columnObj,
  };
};

export const setCurrentCardData = (cardObj) => {
  return {
    type: SET_CURRENT_CARD_DATA,
    payLoad: cardObj,
  };
};
