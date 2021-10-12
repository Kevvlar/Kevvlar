import React from "react";

import NavBar from "../../components/navbar/NavBar";
import Directory from "../../components/directory/Directory";

import "./homePage.css";

const HomePage = () => (
  <div className="homepage">
    <NavBar />
    <Directory />
  </div>
);

export default HomePage;
