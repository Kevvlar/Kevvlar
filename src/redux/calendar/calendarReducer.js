import { ADD_EVENT, EDIT_EVENT, CLEAR_EVENTS } from "./calendarTypes";

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
      const index = state.eventList.findIndex(
        (event) => event.id === action.payLoad.eventId
      );
      const newEventList = [...state.eventList];

      newEventList.splice(index, 1, action.payLoad.updatedEvent);
      return {
        ...state,
        eventList: newEventList,
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
