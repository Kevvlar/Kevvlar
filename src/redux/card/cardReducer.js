import {} from "./cardTypes";

const initialState = {
  loading: false,
  error: "",
  currentCardId: "",
  title: "",
  description: "",
  date: "",
  color: "",
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default cardReducer;
