import axios from "axios";
import {
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
