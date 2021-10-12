import { SHOW_LEFT_SIDE_NAV, HIDE_LEFT_SIDE_NAV } from "./leftSideNavTypes";

export const showLeftSideNav = () => {
  return {
    type: SHOW_LEFT_SIDE_NAV,
  };
};

export const hideLeftSideNav = () => {
  return {
    type: HIDE_LEFT_SIDE_NAV,
  };
};
