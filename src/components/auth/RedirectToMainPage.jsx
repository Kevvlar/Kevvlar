import React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from "./index";

const RedirectToMainPage = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Redirect
          to={{ pathname: "/boards", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default RedirectToMainPage;
