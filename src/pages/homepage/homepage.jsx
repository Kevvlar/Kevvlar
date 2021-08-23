import React from "react";

import NavBar from "../../components/navbar/navbar.component";
import Directory from "../../components/directory/directory.component";

import "./homepage.styles.css";

const Homepage = () => (
  <div className="homepage">
    <NavBar />
    <Directory />
  </div>
);

export default Homepage;
