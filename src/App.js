import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Homepage from "./pages/homepage/homepage.jsx";
import Todopage from "./pages/todo/todopage.jsx";
import SignUp from "./components/signup/signup.component";
import LogIn from "./components/login/login.component";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/app" component={Todopage} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
