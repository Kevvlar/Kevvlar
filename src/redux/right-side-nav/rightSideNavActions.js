import {
  TOGGLE_RIGHT_SIDE_NAV,
  TOGGLE_FLAT_CARD,
  TOGGLE_GRID_CARD,
} from "./rightSideNavTypes";

export const toggleRightSideNav = () => {
  return {
    type: TOGGLE_RIGHT_SIDE_NAV,
  };
};

export const toggleFlatCard = () => {
  return {
    type: TOGGLE_FLAT_CARD,
  };
};

export const toggleGridCard = () => {
  return {
    type: TOGGLE_GRID_CARD,
  };
};
