import axios from "axios";
import {
  TOGGLE_FILE_MODAL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  FETCH_FILE_SUCCESS,
  FETCH_FILE_FAILURE,
} from "./fileTypes";

export const toggleFileModal = () => {
  return {
    type: TOGGLE_FILE_MODAL,
  };
};

export const uploadFileRequest = () => {
  return {
    type: UPLOAD_FILE_REQUEST,
  };
};

export const uploadFileSuccess = () => {
  return {
    type: UPLOAD_FILE_SUCCESS,
  };
};

export const uploadFileFailure = (error) => {
  return {
    type: UPLOAD_FILE_FAILURE,
    payLoad: error,
  };
};

export const fetchFilesSuccess = (files) => {
  return {
    type: FETCH_FILE_SUCCESS,
    payLoad: files,
  };
};

export const fetchFilesFailure = (error) => {
  return {
    type: FETCH_FILE_FAILURE,
    payLoad: error,
  };
};

export const fetchFiles = (token, boardId) => {
  return (dispatch) => {
    axios
      .get("https://kevvlar.herokuapp.com/api/v1/files", {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        const files = response.data.data.files;
        dispatch(fetchFilesSuccess(files));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchFilesFailure(error.msg));
      });
  };
};

export const uploadFile = (token, boardId, fileData) => {
  return (dispatch) => {
    dispatch(uploadFileRequest());
    axios
      .post("https://kevvlar.herokuapp.com/api/v1/files", fileData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        dispatch(uploadFileSuccess());
        dispatch(fetchFiles(token, boardId));
      })
      .catch((error) => {
        console.log(error);
        dispatch(uploadFileFailure(error.msg));
      });
  };
};
