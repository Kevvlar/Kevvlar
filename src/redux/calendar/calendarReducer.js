import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT } from "./calendarTypes";

const initialState = {
  events: [],
  error: "",
  loading: false,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payLoad],
      };

    case EDIT_EVENT:
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.id === action.payLoad.id) {
            event = action.payLoad;
            return event;
          }
          return event;
        }),
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payLoad),
      };

    default:
      return state;
  }
};

export default calendarReducer;
