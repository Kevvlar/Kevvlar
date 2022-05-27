import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import BoardsPage from "./pages/BoardsPage/BoardsPage";
import Homepage from "./pages/HomePage/HomePage";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import ConferenceModal from "./components/modal/ConferenceModal/ConferenceModal";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import PrivateRoute from "./components/auth/PrivateRoute";
import RedirectToMainPage from "./components/auth/RedirectToMainPage";

import { CONFERENCE_MODAL } from "./redux/modal/modalTypes";

import "./App.css";
import "stream-chat-react/dist/css/index.css";

const App = ({ modalType }) => {
  return (
    <div className="App">
      {modalType === CONFERENCE_MODAL && <ConferenceModal />}
      <Switch>
        <RedirectToMainPage exact path="/" component={Homepage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/error" component={ErrorPage} />
        <PrivateRoute
          path="/boards/:boardId/:cardId?"
          component={ActivityPage}
        />
        <PrivateRoute exact path="/boards" component={BoardsPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
    modalType: state.modal.conference,
  };
};

export default connect(mapStateToProps, null)(App);
