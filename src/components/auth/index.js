export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", data);
    next();
  }
};

export const isAuthenticated = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};
