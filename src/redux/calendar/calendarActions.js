import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CLEAR_EVENTS,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
} from "./calendarTypes";
import axios from "axios";

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

export const fetchEventsRequest = () => {
  return {
    type: FETCH_EVENTS_REQUEST,
  };
};

export const fetchEventsSuccess = (events) => {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payLoad: events,
  };
};

export const fetchEventsFailure = (error) => {
  return {
    type: FETCH_EVENTS_FAILURE,
    payLoad: error,
  };
};

export const fetchEvents = (token, boardId) => {
  return (dispatch) => {
    axios
      .get(`https://kevvlar.herokuapp.com/api/v1/events`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .then((response) => {
        const events = response.data.data.events;
        console.log(events);
        dispatch(fetchEventsSuccess(events));
      })
      .catch((error) => {
        dispatch(fetchEventsFailure(error.message));
      });
  };
};
