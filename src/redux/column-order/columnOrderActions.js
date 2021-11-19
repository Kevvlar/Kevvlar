import { ADD_NEW_COLUMN_ORDER_LOCAL } from "./columnOrderTypes";

export const addNewColumnOrderLocal = (orderObj) => {
  return {
    type: ADD_NEW_COLUMN_ORDER_LOCAL,
    payLoad: orderObj,
  };
};
