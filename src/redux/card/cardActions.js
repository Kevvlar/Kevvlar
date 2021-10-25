import {
  ADD_CARD_REQUEST,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
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

export const setCardData = (data) => {
  return {
    type: SET_CARD_DATA,
    payLoad: data,
  };
};

export const addCard = (data, boardId, columnId) => {
  return (dispatch) => {
    dispatch(addCardRequest());
    axios
      .post("http://localhost:8000/api/v1/cards", data, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
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
