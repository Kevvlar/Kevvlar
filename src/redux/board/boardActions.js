import axios from "axios";
import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  ADD_NEW_BOARD_LOCAL,
  ADD_NEW_BOARD_SERVER,
  ADD_NEW_BOARD_SERVER_FAILURE,
  ADD_MEMBER_TO_BOARD_FAILURE,
  ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL,
  ADD_MEMBER_TO_BOARD_SUCCESS,
  EDIT_BOARD_LOCAL,
  EDIT_BOARD_SERVER,
  EDIT_BOARD_SERVER_FAILURE,
  DELETE_BOARD_LOCAL,
  DELETE_BOARD_SERVER,
  DELTE_BOARD_SERVER_FAILURE,
  ENTER_SEARCH_TEXT,
  SET_CURRENT_BOARD_DATA,
  REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL,
  CHANGE_COLUMNS_ORDER_LOCAL,
} from "./boardTypes";
import { clearColumns } from "../index";

// FETCH BOARDS
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
    axios
      .get("https://kevvlar.herokuapp.com/api/v1/boards", {
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

// ADD NEW BOARDS
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
      .post("https://kevvlar.herokuapp.com/api/v1/boards", boardObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        dispatch(addNewBoardServer());
      })
      .catch((error) => {
        dispatch(addNewBoardFailure(error.message));
      });
  };
};

//EDIT BOARDS
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
      .patch(
        `https://kevvlar.herokuapp.com/api/v1/boards/${boardId}`,
        boardObj,
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
      .then(() => {
        dispatch(editCurrentBoardServer());
      })
      .catch((error) => {
        dispatch(editCurrentBoardServerFailure(error.message));
      });
  };
};

// DELETE BOARDS
export const deleteCurrentBoardLocal = (boardId) => {
  return {
    type: DELETE_BOARD_LOCAL,
    payLoad: boardId,
  };
};

export const handleDeleteBoardLocal = (boardId) => {
  return (dispatch) => {
    dispatch(deleteCurrentBoardLocal(boardId));
    dispatch(clearColumns());
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
      .delete(`https://kevvlar.herokuapp.com/api/v1/boards/${boardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then(() => {
        dispatch(deleteCurrentBoardServer());
      })
      .catch((error) => {
        dispatch(deleteCurrentBoardServerFailure(error.message));
      });
  };
};

export const addMemberToBoardSuccess = (members) => {
  return {
    type: ADD_MEMBER_TO_BOARD_SUCCESS,
    payLoad: members,
  };
};

export const addMemberToBoardFailure = (error) => {
  return {
    type: ADD_MEMBER_TO_BOARD_FAILURE,
    payLoad: error,
  };
};

export const addMemberToBoard = (token, addObj) => {
  return (dispatch) => {
    axios
      .patch(`https://kevvlar.herokuapp.com/api/v1/boards/addmember`, addObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const members = response.data.data.board.members;
        dispatch(addMemberToBoardSuccess(members));
      })
      .catch((error) => {
        dispatch(addMemberToBoardFailure("Could not add user to board"));
        alert("Could not add user to board");
      });
  };
};

export const enterSearchText = (text) => {
  return {
    type: ENTER_SEARCH_TEXT,
    payLoad: text,
  };
};

export const setCurrentBoardData = (board) => {
  return {
    type: SET_CURRENT_BOARD_DATA,
    payLoad: board,
  };
};

export const fetchBoard = (token, boardId) => {
  return (dispatch) => {
    axios
      .get(`https://kevvlar.herokuapp.com/api/v1/boards/${boardId}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const board = response.data.data.board;
        dispatch(setCurrentBoardData(board));
      })
      .catch((error) => {
        alert(error.message);
      });
  };
};

export const addColumnToColumnsOrderLocal = (columnId) => {
  return {
    type: ADD_COLUMN_TO_COLUMNS_ORDER_LOCAL,
    payLoad: columnId,
  };
};

export const removeColumnFromColumnsOrderLocal = (columnId) => {
  return {
    type: REMOVE_COLUM_FROM_COLUMNS_ORDER_LOCAL,
    payLoad: columnId,
  };
};

export const changeColumnsOrderLocal = (changeObj) => {
  return {
    type: CHANGE_COLUMNS_ORDER_LOCAL,
    payLoad: changeObj,
  };
};
