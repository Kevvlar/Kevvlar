import React from "react";
import { Switch, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage";
import MainPage from "./pages/mainpage/mainpage";
import SignUp from "./components/signup/signup.component";
import SignIn from "./components/signin/signin.component";

import "./App.css";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/app" component={MainPage} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  </div>
);

export default App;
