import React from "react";
import { StreamChat } from "stream-chat";
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
import ChatButton from "./components/ChatButton/ChatButton";

import "stream-chat-react/dist/css/index.css";
import "./App.css";

const App = ({ user }) => {
  const client = StreamChat.getInstance(process.env.REACT_APP_STREAM_API_KEY);

  if (user.chatToken) {
    client.disconnectUser();
    client.connectUser(
      {
        id: user._id,
        name: user.name,
        photo: user.photo,
        email: user.email,
      },
      user.chatToken
    );
  }

  return (
    <div className="App">
      <Switch>
        <RedirectToMainPage exact path="/" component={Homepage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/error" component={ErrorPage} />
        <>
          <PrivateRoute
            exact
            path="/boards/:boardId"
            component={ActivityPage}
          />
          <PrivateRoute path="/boards" component={BoardsPage} />
          {user.email === "hotlovac.d@gmail.com" ||
          user.email === "evangel@gmail.com" ? (
            <ChatButton />
          ) : null}
        </>
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
