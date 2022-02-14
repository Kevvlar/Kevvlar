import axios from "axios";
import {
  TOGGLE_FILE_MODAL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  FETCH_FILE_SUCCESS,
  FETCH_FILE_FAILURE,
  DELETE_FILE,
} from "./fileTypes";

import { apiUrl } from "../index";

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

export const handleDeleteFile = (fileId) => {
  return {
    type: DELETE_FILE,
    payLoad: fileId,
  };
};

export const fetchFiles = (token, boardId) => {
  return (dispatch) => {
    axios
      .get(`${apiUrl}files`, {
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
      .post(`${apiUrl}files`, fileData, {
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

export const deleteFile = (token, boardId, fileId, publicId) => {
  return (dispatch) => {
    dispatch(handleDeleteFile(fileId));
    axios
      .delete(`${apiUrl}files/${fileId}`, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
          publicId,
        },
      })
      .catch((error) => {
        console.log(error);
        dispatch(uploadFileFailure(error.msg));
      });
  };
};
