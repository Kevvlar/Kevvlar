import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CLEAR_EVENTS,
} from "./calendarTypes";

export const addEvent = (newEvent) => {
  return {
    type: ADD_EVENT,
    payLoad: newEvent,
  };
};

export const editEvent = (id, updatedEvent) => {
  return {
    type: EDIT_EVENT,
    payLoad: { eventId: id, event: updatedEvent },
  };
};

export const deletEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payLoad: eventId,
  };
};

export const clearEvent = () => {
  return {
    type: CLEAR_EVENTS,
  };
};
