import axios from "axios";
import {
  SIGN_UP_USER_REQUEST,
  SIGN_UP_USER_SUCCESS,
  SIGN_UP_USER_FAILURE,
  SIGN_IN_USER_REQUEST,
  SIGN_IN_USER_SUCCESS,
  SIGN_IN_USER_FAILURE,
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  LOG_USER_OUT,
  CLEAR_ERROR_MESSAGE,
  TURN_OFF_NOTIFY,
  SET_NOTIFY_STATUS,
  IS_READ,
} from "./userTypes";

import { apiUrl } from "../index";

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

export const handleLogOutUser = (history) => {
  return (dispatch) => {
    dispatch(logUserOut());
    history.push("/signin");
  };
};

export const signUserUp = (userData, history) => {
  return (dispatch) => {
    dispatch(signUpUserRequest());
    axios
      .post(`${apiUrl}users/signup`, userData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const user = response.data.data.user;
        dispatch(signUpUserSuccess(user));
        history.push("/boards");
      })
      .catch((error) => {
        dispatch(signUpUserFailure(error.response?.data.message));
      });
  };
};

export const signUserIn = (userData, history) => {
  return (dispatch) => {
    dispatch(signInUserRequest());
    axios
      .post(`${apiUrl}users/signin`, userData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        const user = response.data.data.user;
        dispatch(signInUserSuccess(user));
        history.push("/boards");
      })
      .catch((error) => {
        dispatch(signInUserFailure(error.response?.data.message));
      });
  };
};

export const sendNotification = (token, boardId, notificationObject) => {
  return () => {
    axios
      .post(`${apiUrl}notifications/`, notificationObject, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          boardId,
        },
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const setNotifyStatus = (status) => {
  return {
    type: SET_NOTIFY_STATUS,
    payLoad: status,
  };
};

export const getNotificationStatus = (token) => {
  return (dispatch) => {
    axios
      .get(`${apiUrl}notifications/status`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setNotifyStatus(response.data.data.status.isNotified));
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
};

export const turnOffNotify = (bool) => {
  return {
    type: TURN_OFF_NOTIFY,
    payLoad: bool,
  };
};

export const fetchNotificationsRequest = () => {
  return {
    type: FETCH_NOTIFICATIONS_REQUEST,
  };
};

export const fetchNotificationsSuccess = (notifications) => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    payLoad: notifications,
  };
};

export const fetchNotificationsFailure = (error) => {
  return {
    type: FETCH_NOTIFICATIONS_FAILURE,
    payLoad: error,
  };
};

export const getNotifications = (token) => {
  return (dispatch) => {
    dispatch(fetchNotificationsRequest());
    axios
      .get(`${apiUrl}notifications`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const notifications = response.data.data.notifications;
        dispatch(fetchNotificationsSuccess(notifications));
      })
      .catch((error) => {
        dispatch(fetchNotificationsFailure(error.response));
      });
  };
};

export const clearErrorMessage = () => {
  return {
    type: CLEAR_ERROR_MESSAGE,
  };
};

export const isRead = (id) => {
  return {
    type: IS_READ,
    payLoad: id,
  };
};

export const isReadServer = (token, id) => {
  return (dispatch) => {
    dispatch(isRead(id));
    axios
      .patch(
        `${apiUrl}notifications/${id}`,
        { isRead: true },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((error) => {
        console.log(error.response);
      });
  };
};
