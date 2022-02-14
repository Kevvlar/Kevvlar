import io from "socket.io-client";
const ENDPOINT =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_IO_LOCAL
    : process.env.REACT_APP_IO_LIVE;
export default io(ENDPOINT);

// const url = "https://kevvlar.herokuapp.com";
// const url = "http://localhost:8000";
