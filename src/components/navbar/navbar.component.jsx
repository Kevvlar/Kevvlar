import React from "react";

import "./navbar.styles.css";

const NavBar = ({ menuItem }) => (
  <header>
    <div className="navbar-container">
      <p className="navbar-logo primary-text-color">KEVVLAR</p>
      <button className="navbar-button">sign up</button>
    </div>
  </header>
);

export default NavBar;
