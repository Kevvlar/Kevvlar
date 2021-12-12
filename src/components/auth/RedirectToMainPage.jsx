import React from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const RedirectToMainPage = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user.token ? (
        <Redirect
          to={{ pathname: "/boards", state: { from: props.location } }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(RedirectToMainPage);
