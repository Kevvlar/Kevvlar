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
  DELETE_EVENT_SERVER_REQUEST,
  DELETE_EVENT_SERVER_FAILURE,
} from "./calendarTypes";

const initialState = {
  loading: false,
  error: "",
  eventList: [],
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        eventList: [],
      };

    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        eventList: action.payLoad,
      };

    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payLoad,
      };

    case ADD_NEW_EVENT_SERVER_REQUEST:
      return {
        ...state,
        error: "",
      };

    case ADD_NEW_EVENT_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case ADD_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, action.payLoad],
      };

    case EDIT_EVENT_SERVER_REQUEST:
      return {
        ...state,
        error: "",
      };

    case EDIT_EVENT_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case EDIT_EVENT:
      return {
        ...state,
        eventList: state.eventList.map((event) =>
          event.id === action.payLoad.eventId
            ? {
                ...event,
                title: action.payLoad.event?.title,
                start: action.payLoad.event?.start,
                end: action.payLoad.event?.end,
                allDay: action.payLoad.event?.allDay,
                users: action.payLoad.event?.users,
                originUser: action.payLoad.event?.originUser,
                description: action.payLoad.event?.description,
              }
            : event
        ),
      };

    case DELETE_EVENT:
      return {
        ...state,
        eventList: state.eventList.filter((item) => item.id !== action.payLoad),
      };

    case DELETE_EVENT_SERVER_REQUEST:
      return {
        ...state,
        error: "",
      };

    case DELETE_EVENT_SERVER_FAILURE:
      return {
        ...state,
        error: action.payLoad,
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        error: "",
        eventList: [],
      };

    default:
      return state;
  }
};

export default calendarReducer;
