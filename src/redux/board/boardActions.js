import axios from "axios";
import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  ADD_NEW_BOARD_LOCAL,
  ADD_NEW_BOARD_SERVER,
  ADD_NEW_BOARD_SERVER_FAILURE,
  SET_CURRENT_BOARD_DATA,
  EDIT_BOARD_LOCAL,
  EDIT_BOARD_SERVER,
  EDIT_BOARD_SERVER_FAILURE,
  DELETE_BOARD_LOCAL,
  DELETE_BOARD_SERVER,
  DELTE_BOARD_SERVER_FAILURE,
  ENTER_SEARCH_TEXT,
} from "./boardTypes";

export const fetchBoardsRequest = () => {
  return {
    type: FETCH_BOARDS_REQUEST,
  };
};

export const fetchBoardsSuccess = (boards) => {
  return {
    type: FETCH_BOARDS_SUCCESS,
    payLoad: boards,
  };
};

export const fetchBoardsFailure = (error) => {
  return {
    type: FETCH_BOARDS_FAILURE,
    payLoad: error,
  };
};

export const fetchBoards = (token) => {
  return (dispatch) => {
    dispatch(fetchBoardsRequest());
    axios
      .get("http://localhost:8000/api/v1/boards", {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const boards = response.data.data.boards;
        dispatch(fetchBoardsSuccess(boards));
      })
      .catch((error) => {
        dispatch(fetchBoardsFailure(error.message));
      });
  };
};

export const addNewBoardLocal = (boardObj) => {
  return {
    type: ADD_NEW_BOARD_LOCAL,
    payLoad: boardObj,
  };
};

export const addNewBoardServer = () => {
  return {
    type: ADD_NEW_BOARD_SERVER,
  };
};

export const addNewBoardFailure = (error) => {
  return {
    type: ADD_NEW_BOARD_SERVER_FAILURE,
    payLoad: error,
  };
};

export const createNewBoardServer = (boardObj, token) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/api/v1/boards", boardObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(addNewBoardServer());
      })
      .catch((error) => {
        dispatch(addNewBoardFailure(error.message));
      });
  };
};

export const setCurrentBoardData = (board) => {
  return {
    type: SET_CURRENT_BOARD_DATA,
    payLoad: board,
  };
};

export const editCurrentBoardLocal = (boardObj) => {
  return {
    type: EDIT_BOARD_LOCAL,
    payLoad: boardObj,
  };
};

export const editCurrentBoardServer = () => {
  return {
    type: EDIT_BOARD_SERVER,
  };
};

export const editCurrentBoardServerFailure = (error) => {
  return {
    type: EDIT_BOARD_SERVER_FAILURE,
    payLoad: error,
  };
};

export const editBoardServer = (boardId, boardObj, token) => {
  return (dispatch) => {
    axios
      .patch(`http://localhost:8000/api/v1/boards/${boardId}`, boardObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        dispatch(editCurrentBoardServer());
      })
      .catch((error) => {
        dispatch(editCurrentBoardServerFailure(error.message));
      });
  };
};

export const deleteCurrentBoardLocal = (boardId) => {
  return {
    type: DELETE_BOARD_LOCAL,
    payLoad: boardId,
  };
};

export const deleteCurrentBoardServer = () => {
  return {
    type: DELETE_BOARD_SERVER,
  };
};

export const deleteCurrentBoardServerFailure = (error) => {
  return {
    type: DELTE_BOARD_SERVER_FAILURE,
    payLoad: error,
  };
};

export const handleDeleteBoardServer = (boardId, token) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:8000/api/v1/boards/${boardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        dispatch(deleteCurrentBoardServer());
      })
      .catch((error) => {
        dispatch(deleteCurrentBoardServerFailure(error.message));
      });
  };
};

export const enterSearchText = (text) => {
  return {
    type: ENTER_SEARCH_TEXT,
    payLoad: text,
  };
};
