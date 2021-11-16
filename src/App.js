import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/HomePage/HomePage";
import MainPage from "./pages/MainPage/MainPage";
import BoardsPage from "./pages/BoardsPage/BoardsPage";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import PrivateRoute from "./components/auth/PrivateRoute";
import RedirectToMainPage from "./components/auth/RedirectToMainPage";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Switch>
        <RedirectToMainPage exact path="/" component={Homepage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute path="/boards/:id" exact component={MainPage} />
        <PrivateRoute path="/boards" exact component={BoardsPage} />
      </Switch>
    </div>
  </Provider>
);

export default App;
