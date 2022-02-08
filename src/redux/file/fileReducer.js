import { TOGGLE_FILE_MODAL } from "./fileTypes";

const initialState = {
  showFile: false,
};

const FileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILE_MODAL:
      return {
        ...state,
        showFile: state.showFile === false ? true : false,
      };

    default:
      return state;
  }
};

export default FileReducer;
