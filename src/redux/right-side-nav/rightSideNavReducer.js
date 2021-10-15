import {
  TOGGLE_RIGHT_SIDE_NAV,
  TOGGLE_GRID_CARD,
  TOGGLE_FLAT_CARD,
} from "./rightSideNavTypes";

const initialState = {
  rightSideNav: false,
  isGrid: true,
};

const rightSideNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_RIGHT_SIDE_NAV:
      return {
        ...state,
        rightSideNav: state.rightSideNav === false ? true : false,
      };
    case TOGGLE_FLAT_CARD:
      return {
        ...state,
        isGrid: false,
        rightSideNav: true,
      };
    case TOGGLE_GRID_CARD:
      return {
        ...state,
        isGrid: true,
        rightSideNav: true,
      };
    default:
      return state;
  }
};

export default rightSideNavReducer;
