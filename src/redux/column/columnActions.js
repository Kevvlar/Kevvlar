import axios from "axios";
import {
  FETCH_COLUMNS_REQUEST,
  FETCH_COLUMNS_SUCCESS,
  FETCH_COLUMNS_FAILURE,
  FETCH_ACTIVITIES_REQUEST,
  FETCH_ACTIVITIES_SUCCESS,
  FETCH_ACTIVITIES_FAILURE,
  ADD_NEW_COLUMN_LOCAL,
  ADD_NEW_COLUMN_SERVER_FAILURE,
  EDIT_COLUMN_LOCAL,
  EDIT_COLUMN_SERVER_SUCCESS,
  EDIT_COLUMN_SERVER_FAILURE,
  REMOVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_SUCCESS,
  REOMVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_FAILURE,
  DELETE_COLUMN_LOCAL,
  DELETE_COLUMN_SERVER_SUCCESS,
  DELETE_COLUMN_SERVER_FAILURE,
  CHANGE_CARD_COLUMN_ID,
  CHANGE_CARD_COLUMN_LOCAL,
  ADD_NEW_CARD_LOCAL,
  ADD_NEW_CARD_SERVER_FAILURE,
  EDIT_CARD_LOCAL,
  EDIT_CARD_SERVER_FAILURE,
  DELETE_CARD_LOCAL,
  DELETE_CARD_SERVER_FAILURE,
  CHANGE_CARDS_ORDER_LOCAL,
  CHANGE_CARDS_ORDER_IO,
  REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
  ENTER_CARD_SEARCH_KEY,
  SET_CURRENT_COLUMN_DATA,
  SET_CURRENT_CARD_DATA,
  CLEAR_COLUMNS,
  REMOVE_CARD_FROM_SOURCE_COLUMN_IO,
  CHANGE_CARD_COLUMN_IO,
  TOGGLE_ASSIGNED_TO_ME,
  RESET_IS_ME,
  CLEAR_CARD_SEARCH_KEY,
} from "./columnTypes";

import {
  addColumnToColumnsOrderLocal,
  fetchBoard,
  removeColumnFromColumnsOrderLocal,
  setCardModal,
  setErrorModal,
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

export const fetchActivitiesRequest = () => {
  return {
    type: FETCH_ACTIVITIES_REQUEST,
  };
};

export const fetchActivitiesSuccess = (activities) => {
  return {
    type: FETCH_ACTIVITIES_SUCCESS,
    payLoad: activities,
  };
};

export const fetchActivitiesFailure = (error) => {
  return {
    type: FETCH_ACTIVITIES_FAILURE,
    payLoad: error,
  };
};

export const fetchActivities = (token, boardId) => {
  return (dispatch) => {
    dispatch(fetchActivitiesRequest());
    axios
      .get(`https://kevvlar.herokuapp.com/api/v1/activities`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        const activities = response.data.data.activities;
        dispatch(fetchActivitiesSuccess(activities));
      })
      .catch((error) => {
        dispatch(fetchActivitiesFailure(error.message));
      });
  };
};

export const createActivity = (token, boardId, data) => {
  return () => {
    axios
      .post(`https://kevvlar.herokuapp.com/api/v1/activities`, data, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const fetchColumns = (token, boardId) => {
  return (dispatch) => {
    axios
      .get(`https://kevvlar.herokuapp.com/api/v1/columns`, {
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

export const getUpdate = (token, boardId) => {
  return (dispatch) => {
    dispatch(fetchBoard(token, boardId));
    dispatch(fetchColumns(token, boardId));
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
      .post(`https://kevvlar.herokuapp.com/api/v1/columns/`, columnObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
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

export const removeCardFromColumnServerSuccess = () => {
  return {
    type: REMOVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_SUCCESS,
  };
};

export const removeCardFromColumnServerFailure = (error) => {
  return {
    type: REOMVE_CARD_FROM_CARD_FROM_COLUMN_SERVER_FAILURE,
    payLoad: error,
  };
};

export const removeCardFromColumnsOrderServer = (
  token,
  boardId,
  columnId,
  columnObj
) => {
  return (dispatch) => {
    dispatch(removeCardFromColumnServerSuccess());
    axios
      .patch(
        `https://kevvlar.herokuapp.com/api/v1/columns/removecardcolumn/${columnId}`,
        columnObj,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            boardId,
          },
        }
      )
      .catch((error) => {
        dispatch(removeCardFromColumnServerFailure(error.message));
      });
  };
};

export const editColumnServer = (token, boardId, columnId, columnObj) => {
  return (dispatch) => {
    dispatch(editColumnServerSuccess());
    axios
      .patch(
        `https://kevvlar.herokuapp.com/api/v1/columns/${columnId}`,
        columnObj,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            boardId,
          },
        }
      )
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
      .delete(`https://kevvlar.herokuapp.com/api/v1/columns/${columnId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
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
      .post(`https://kevvlar.herokuapp.com/api/v1/cards`, cardObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
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

export const editCardServerFailure = (error) => {
  return {
    type: EDIT_CARD_SERVER_FAILURE,
    payLoad: error,
  };
};

export const editCardServer = (token, boardId, cardId, cardObj) => {
  return (dispatch) => {
    axios
      .patch(`https://kevvlar.herokuapp.com/api/v1/cards/${cardId}`, cardObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .catch((error) => {
        dispatch(editColumnServerFailure(error.message));
      });
  };
};

export const deleteCardLocal = (deleteObj) => {
  return {
    type: DELETE_CARD_LOCAL,
    payLoad: deleteObj,
  };
};

export const deleteCardServerFailure = (error) => {
  return {
    type: DELETE_CARD_SERVER_FAILURE,
    payLoad: error,
  };
};

export const deleteCardServer = (token, boardId, cardId) => {
  return (dispatch) => {
    axios
      .delete(`https://kevvlar.herokuapp.com/api/v1/cards/${cardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .catch((error) => {
        dispatch(editColumnServerFailure(error.message));
      });
  };
};

export const changeCardsOrderLocal = (order) => {
  return {
    type: CHANGE_CARDS_ORDER_LOCAL,
    payLoad: order,
  };
};

export const changeCardsOderIo = (changeObj) => {
  return {
    type: CHANGE_CARDS_ORDER_IO,
    payLoad: changeObj,
  };
};

export const removeCardFromSourceColumnLocal = (sourceColumnId) => {
  return {
    type: REMOVE_CARD_FROM_SOURCE_COLUMN_LOCAL,
    payLoad: sourceColumnId,
  };
};

export const changeCardColumnId = (columnId) => {
  return {
    type: CHANGE_CARD_COLUMN_ID,
    payLoad: columnId,
  };
};

export const changeCardColumnLocal = (changeObj) => {
  return {
    type: CHANGE_CARD_COLUMN_LOCAL,
    payLoad: changeObj,
  };
};

export const handleChangeCardColumnLocal = (sourceColumnId, changeObj) => {
  return (dispatch) => {
    dispatch(changeCardColumnLocal(changeObj));
    dispatch(removeCardFromSourceColumnLocal(sourceColumnId));
    dispatch(changeCardColumnId(changeObj.destinationColumn));
  };
};

export const removeCardFromSourceColumnIO = (removeObj) => {
  return {
    type: REMOVE_CARD_FROM_SOURCE_COLUMN_IO,
    payLoad: removeObj,
  };
};

export const changeCardColumnIO = (changeObj) => {
  return {
    type: CHANGE_CARD_COLUMN_IO,
    payLoad: changeObj,
  };
};

export const handleChangeCardColumnIO = (data) => {
  return (dispatch) => {
    dispatch(
      removeCardFromSourceColumnIO({
        sourceColumnId: data.sourceColumnId,
        cardId: data.cardId,
      })
    );
    dispatch(
      changeCardColumnIO({
        destinationColumnId: data.destinationColumnId,
        card: data.card,
        cardsOrder: data.cardsOrder,
      })
    );
  };
};

export const enterCardSearchKey = (keyWord) => {
  return {
    type: ENTER_CARD_SEARCH_KEY,
    payLoad: keyWord,
  };
};

export const clearCardSearchKey = () => {
  return {
    type: CLEAR_CARD_SEARCH_KEY,
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

export const fetchCard = (token, boardId, cardId) => {
  return (dispatch) => {
    axios
      .get(`https://kevvlar.herokuapp.com/api/v1/cards/${cardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        const card = response.data.data.card;
        if (!card) {
          dispatch(setErrorModal(`Oops this card no longer exsits.`));
        } else if (card) {
          dispatch(setCurrentCardData(card));
          dispatch(setCardModal("EDIT"));
        }
      })
      .catch((error) => {
        dispatch(fetchColumnsFailure(error.message));
      });
  };
};

export const emitCreateNewColumnIO = (socket, data) => {
  return () => {
    socket.emit("add-new-column", data);
  };
};

export const toggleAssignedMe = () => {
  return {
    type: TOGGLE_ASSIGNED_TO_ME,
  };
};

export const resetIsMe = () => {
  return {
    type: RESET_IS_ME,
  };
};
