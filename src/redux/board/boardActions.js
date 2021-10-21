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
  SET_CURRENT_BOARD_ID_AND_TITLE,
} from "./boardTypes";
import axios from "axios";

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
      .post("http://localhost:8000/api/v1/boards", data, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
      })
      .then((response) => {
        dispatch(addNewBoardSuccess());
        dispatch(fetchBoards());
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
      .patch(`http://localhost:8000/api/v1/boards/${boardId}`, data, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
      })
      .then(() => {
        dispatch(editBoardSuccess());
        dispatch(fetchBoards());
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
      .delete(`http://localhost:8000/api/v1/boards/${boardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
      })
      .then(() => {
        dispatch(deleteBoardSuccess());
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
      .get("http://localhost:8000/api/v1/boards", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM2YmI4MTA4M2I2MWVjNThhMGNjNSIsImlhdCI6MTYzNDQ5NTQxN30.G2V6WZJTZOlE-aVc6ELaQ1crB6ldd0GPF5dQtLXuPZE",
        },
      })
      .then((response) => {
        const boards = response.data.data.boards;
        dispatch(fetchBoardsSuccess(boards));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchBoardsFailure(errorMsg));
      });
  };
};
