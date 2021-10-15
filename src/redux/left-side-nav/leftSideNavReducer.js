import { SHOW_LEFT_SIDE_NAV, HIDE_LEFT_SIDE_NAV } from "./leftSideNavTypes";

const initialState = {
  leftSideNav: false,
};

const leftSideNavReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LEFT_SIDE_NAV:
      return {
        ...state,
        leftSideNav: true,
      };
    case HIDE_LEFT_SIDE_NAV:
      return {
        ...state,
        leftSideNav: false,
      };

    default:
      return state;
  }
};

export default leftSideNavReducer;
