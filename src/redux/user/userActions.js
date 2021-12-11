import axios from "axios";
import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  LOG_USER_OUT,
} from "./userTypes";

export const signUpUserRequest = () => {
  return {
    type: SIGN_UP_USER_REQUEST,
  };
};

export const signUpUserSuccess = (user) => {
  return {
    type: SIGN_UP_USER_SUCCESS,
    payLoad: user,
  };
};

export const signUpUserFailure = (error) => {
  return {
    type: SIGN_UP_USER_FAILURE,
    payLoad: error,
  };
};

export const signInUserRequest = () => {
  return {
    type: SIGN_IN_USER_REQUEST,
  };
};

export const signInUserSuccess = (user) => {
  return {
    type: SIGN_IN_USER_SUCCESS,
    payLoad: user,
  };
};

export const signInUserFailure = (error) => {
  return {
    type: SIGN_IN_USER_FAILURE,
    payLoad: error,
  };
};

export const logUserOut = () => {
  return {
    type: LOG_USER_OUT,
  };
};

export const handleLogOutUser = () => {
  return (dispatch) => {
    window.location.assign("/");
    dispatch(logUserOut());
  };
};

export const signUserUp = (userData) => {
  return (dispatch) => {
    dispatch(signUpUserRequest());
    axios
      .post("http://localhost:8000/api/v1/users/signup", userData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const user = response.data.data.user;
        dispatch(signUpUserSuccess(user));
        window.location.assign("/boards");
      })
      .catch((error) => {
        dispatch(signUpUserFailure(error.message));
      });
  };
};

export const signUserIn = (userData) => {
  return (dispatch) => {
    dispatch(signInUserRequest());
    axios
      .post("http://localhost:8000/api/v1/users/signin", userData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const user = response.data.data.user;
        dispatch(signInUserSuccess(user));
        window.location.assign("/boards");
      })
      .catch((error) => {
        dispatch(signInUserFailure(error.message));
      });
  };
};
