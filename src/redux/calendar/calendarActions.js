import { ADD_EVENT } from "./calendarTypes";

export const addEvent = (newEvent) => {
  return {
    type: ADD_EVENT,
    payLoad: newEvent,
  };
};
