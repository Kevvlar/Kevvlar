import {
  TOGGLE_FILE_MODAL,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  FETCH_FILE_SUCCESS,
  FETCH_FILE_FAILURE,
  DELETE_FILE,
} from "./fileTypes";

const initialState = {
  showFile: false,
  loading: false,
  files: [],
  error: "",
};

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILE_MODAL:
      return {
        ...state,
        showFile: state.showFile === false ? true : false,
      };

    case FETCH_FILE_SUCCESS:
      return {
        ...state,
        files: action.payLoad,
      };

    case FETCH_FILE_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case UPLOAD_FILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false,
        showFile: false,
      };

    case UPLOAD_FILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file._id !== action.payLoad),
      };

    default:
      return state;
  }
};

export default FileReducer;
