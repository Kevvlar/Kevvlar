import React from "react";

import NavBar from "../../components/navbar/NavBar";
import Directory from "../../components/directory/Directory";

import "./homePage.css";

const Homepage = () => (
  <div className="homepage">
    <NavBar />
    <Directory />
  </div>
);

export default Homepage;
