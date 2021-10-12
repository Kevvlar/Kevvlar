import React from "react";
import { Link } from "react-router-dom";

import "./getStartedButton.css";

const GetStartedButton = () => (
  <Link to="/signin" className="greeting-buttons-container">
    <button className="greeting-button-get-started">Get Started</button>
  </Link>
);

export default GetStartedButton;
