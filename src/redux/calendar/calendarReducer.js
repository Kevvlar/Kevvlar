import { ADD_EVENT } from "./calendarTypes";

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
    default:
      return state;
  }
};

export default calendarReducer;
