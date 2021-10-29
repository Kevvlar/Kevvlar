import {
  ADD_BOARD_REQUEST,
  ADD_BOARD_SUCCESS,
  ADD_BOARD_FAILURE,
  EDIT_BOARD_REQUEST,
  EDIT_BOARD_SUCCESS,
  EDIT_BOARD_FAILURE,
  DELETE_BOARD_REQUEST,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_FAILURE,
  FETCH_BOARD_REQUEST,
  FETCH_BOARD_SUCCESS,
  FETCH_BOARD_FAILURE,
  BOARD_API_URL,
  SET_CURRENT_BOARD_ID_AND_TITLE,
} from "./boardTypes";
import axios from "axios";
import { deleteColumnByBoard, fetchColumnOrder, fetchColumns } from "../index";

export const fetchBoardsRequest = () => {
  return {
    type: FETCH_BOARD_REQUEST,
  };
};

export const fetchBoardsSuccess = (boards) => {
  return {
    type: FETCH_BOARD_SUCCESS,
    payLoad: boards,
  };
};

export const fetchBoardsFailure = (error) => {
  return {
    type: FETCH_BOARD_FAILURE,
    payLoad: error,
  };
};

export const addNewBoardRequest = () => {
  return {
    type: ADD_BOARD_REQUEST,
  };
};

export const addNewBoardSuccess = () => {
  return {
    type: ADD_BOARD_SUCCESS,
  };
};

export const addNewBoardFailure = (error) => {
  return {
    type: ADD_BOARD_FAILURE,
    payLoad: error,
  };
};

export const editBoardRequest = () => {
  return {
    type: EDIT_BOARD_REQUEST,
  };
};

export const editBoardSuccess = () => {
  return {
    type: EDIT_BOARD_SUCCESS,
  };
};

export const editBoardFailure = (error) => {
  return {
    type: EDIT_BOARD_FAILURE,
    payLoad: error,
  };
};

export const deleteBoardRequest = () => {
  return {
    type: DELETE_BOARD_REQUEST,
  };
};

export const deleteBoardSuccess = () => {
  return {
    type: DELETE_BOARD_SUCCESS,
  };
};

export const deleteBoardFailure = (error) => {
  return {
    type: DELETE_BOARD_FAILURE,
    payLoad: error,
  };
};

export const setCurrentBoardIdAndTitle = (data) => {
  return {
    type: SET_CURRENT_BOARD_ID_AND_TITLE,
    payLoad: data,
  };
};

export const addBoard = (data) => {
  return (dispatch) => {
    dispatch(addNewBoardRequest());
    axios
      .post(`${BOARD_API_URL}`, data, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const { _id, title } = response.data.data.board;
        dispatch(setCurrentBoardIdAndTitle({ id: _id, title: title }));
        dispatch(fetchBoards());
        dispatch(fetchColumns(_id));
        dispatch(fetchColumnOrder(_id));
        dispatch(addNewBoardSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(addNewBoardFailure(errorMsg));
      });
  };
};

export const editBoard = (data, boardId) => {
  return (dispatch) => {
    dispatch(editBoardRequest());
    axios
      .patch(`${BOARD_API_URL}/${boardId}`, data, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const { _id, title } = response.data.data.board;
        dispatch(setCurrentBoardIdAndTitle({ id: _id, title: title }));
        dispatch(fetchBoards());
        dispatch(fetchColumns(_id));
        dispatch(fetchColumnOrder(_id));
        dispatch(addNewBoardSuccess());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(editBoardFailure(errorMsg));
      });
  };
};

export const deleteBoard = (boardId) => {
  return (dispatch) => {
    dispatch(deleteBoardRequest());
    axios
      .delete(`${BOARD_API_URL}/${boardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        dispatch(deleteBoardSuccess());
        dispatch(deleteColumnByBoard());
        dispatch(fetchBoards());
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(deleteBoardFailure(errorMsg));
      });
  };
};

export const fetchBoards = () => {
  return (dispatch) => {
    dispatch(fetchBoardsRequest());
    axios
      .get(`${BOARD_API_URL}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const boards = response.data.data.boards;
        const firstBoard = boards[0];
        dispatch(fetchColumns(firstBoard._id));
        dispatch(fetchColumnOrder(firstBoard._id));
        dispatch(fetchBoardsSuccess(boards));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBoardsFailure(errorMsg));
      });
  };
};
