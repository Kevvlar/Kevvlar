import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Homepage from "./pages/HomePage/HomePage";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import PrivateRoute from "./components/auth/PrivateRoute";
import RedirectToMainPage from "./components/auth/RedirectToMainPage";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

const App = ({ user }) => {
  return (
    <div className="App">
      <Switch>
        <RedirectToMainPage exact path="/" component={Homepage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/error" component={ErrorPage} />
        <PrivateRoute exact path="/boards/:boardId" component={ActivityPage} />
        <PrivateRoute path="/boards" component={BoardsPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

export default connect(mapStateToProps, null)(App);
