import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from "./calendarTypes";

export const addEvent = (event) => {
  return {
    type: ADD_EVENT,
    payLoad: event,
  };
};

export const editEvent = (event) => {
  return {
    type: EDIT_EVENT,
    payLoad: event,
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payLoad: eventId,
  };
};
