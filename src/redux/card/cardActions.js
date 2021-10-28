import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  EDIT_CARD_REQUEST,
  EDIT_CARD_SUCCESS,
  EDIT_CARD_FAILURE,
  DELETE_CARD_REQUEST,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
  SET_CARD_DATA,
} from "./cardTypes";
import axios from "axios";
import { fetchColumns, fetchColumnOrder } from "../index";

export const addCardRequest = () => {
  return {
    type: ADD_CARD_REQUEST,
  };
};

export const addCardSuccess = () => {
  return {
    type: ADD_CARD_SUCCESS,
  };
};

export const addCardFailure = (error) => {
  return {
    type: ADD_CARD_FAILURE,
    payLoad: error,
  };
};

export const editCardRequest = () => {
  return {
    type: EDIT_CARD_REQUEST,
  };
};

export const editCardSuccess = () => {
  return {
    type: EDIT_CARD_SUCCESS,
  };
};

export const editCardFailure = (error) => {
  return {
    type: EDIT_CARD_FAILURE,
    payLoad: error,
  };
};

export const setCardData = (data) => {
  return {
    type: SET_CARD_DATA,
    payLoad: data,
  };
};

export const deleteCardRequest = () => {
  return {
    type: DELETE_CARD_REQUEST,
  };
};

export const deleteCardSuccess = () => {
  return {
    type: DELETE_CARD_SUCCESS,
  };
};

export const deleteCardFailure = (error) => {
  return {
    type: DELETE_CARD_FAILURE,
    payLoad: error,
  };
};

export const addCard = (data, boardId, columnId) => {
  return (dispatch) => {
    dispatch(addCardRequest());
    axios
      .post("http://localhost:8000/api/v1/cards", data, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        dispatch(fetchColumns(boardId));
        dispatch(fetchColumnOrder(boardId));
        dispatch(addCardSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(addCardFailure(errorMsg));
      });
  };
};

export const editCard = (cardId, boardId, data) => {
  return (dispatch) => {
    dispatch(editCardRequest());
    axios
      .patch(`http://localhost:8000/api/v1/cards/${cardId}`, data, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        dispatch(fetchColumns(boardId));
        dispatch(fetchColumnOrder(boardId));
        dispatch(editCardSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(editCardFailure(errorMsg));
      });
  };
};

export const deleteCard = (cardId, boardId) => {
  return (dispatch) => {
    dispatch(deleteCardRequest());
    axios
      .delete(`http://localhost:8000/api/v1/cards/${cardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        dispatch(fetchColumns(boardId));
        dispatch(fetchColumnOrder(boardId));
        dispatch(deleteCardSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteCardFailure(errorMsg));
      });
  };
};
