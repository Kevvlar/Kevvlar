import { ADD_EVENT, EDIT_EVENT, CLEAR_EVENTS } from "./calendarTypes";

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

export const clearEvent = () => {
  return {
    type: CLEAR_EVENTS,
  };
};
