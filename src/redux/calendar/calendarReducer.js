import {
  ADD_EVENT,
  EDIT_EVENT,
  DELETE_EVENT,
  CLEAR_EVENTS,
} from "./calendarTypes";

const initialState = {
  eventList: [],
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, action.payLoad],
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
                // description: action.payLoad.event?.description,
              }
            : event
        ),
      };

    case DELETE_EVENT:
      return {
        ...state,
        eventList: state.eventList.filter((item) => item.id !== action.payLoad),
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        eventList: [],
      };

    default:
      return state;
  }
};

export default calendarReducer;
