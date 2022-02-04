import { TOGGLE_ACTIVITY } from "./activityTypes";

const initialState = {
  showActivity: false,
};

const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ACTIVITY:
      return {
        ...state,
        showActivity: state.showActivity === false ? true : false,
      };

    default:
      return state;
  }
};

export default activityReducer;
