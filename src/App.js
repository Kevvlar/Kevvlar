import { Switch, Route } from "react-router-dom";

import "./App.css";

import Homepage from "./pages/homepage/homepage.jsx";
import Todopage from "./pages/todo/todopage.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/app" component={Todopage} />
      </Switch>
    </div>
  );
}

export default App;
