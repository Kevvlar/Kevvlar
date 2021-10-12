import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import MainPage from "./pages/mainpage/mainpage";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/app" component={MainPage} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
      </Switch>
    </div>
  </Provider>
);

export default App;
