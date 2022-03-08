import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
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

import "./App.css";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
            <ChatButton />
          </>
        </Switch>
      </div>
    </PersistGate>
  </Provider>
);

export default App;
