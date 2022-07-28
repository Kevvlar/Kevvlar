import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CLEAR_EVENTS,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_NEW_EVENT_SERVER_REQUEST,
  ADD_NEW_EVENT_SERVER_FAILURE,
  EDIT_EVENT_SERVER_REQUEST,
  EDIT_EVENT_SERVER_FAILURE,
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

export const clearEvents = () => {
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

export const addNewEventServerRequest = () => {
  return {
    type: ADD_NEW_EVENT_SERVER_REQUEST,
  };
};

export const addNewEventServerFailure = (error) => {
  return {
    type: ADD_NEW_EVENT_SERVER_FAILURE,
    payLoad: error,
  };
};

export const addEventServer = (token, boardId, eventObj) => {
  return (dispatch) => {
    dispatch(addNewEventServerRequest());
    axios
      .post(`https://kevvlar.herokuapp.com/api/v1/events`, eventObj, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .catch((error) => {
        dispatch(addNewEventServerFailure(error.message));
      });
  };
};

export const editEventServerRequest = () => {
  return {
    type: EDIT_EVENT_SERVER_REQUEST,
  };
};

export const editEventServerFailure = (error) => {
  return {
    type: EDIT_EVENT_SERVER_FAILURE,
    payLoad: error,
  };
};

export const editEventServer = (token, boardId, eventId, eventObj) => {
  return (dispatch) => {
    dispatch(editEventServerRequest());
    axios
      .patch(
        `https://kevvlar.herokuapp.com/api/v1/events/${eventId}`,
        eventObj,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          params: {
            boardId,
          },
        }
      )
      .catch((error) => {
        dispatch(editEventServerFailure(error.message));
      });
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
        dispatch(fetchEventsSuccess(events));
      })
      .catch((error) => {
        dispatch(fetchEventsFailure(error.message));
      });
  };
};
