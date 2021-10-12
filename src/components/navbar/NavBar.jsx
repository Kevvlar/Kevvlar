import React from "react";
import { Link } from "react-router-dom";

import "./navBar.css";

const NavBar = ({ menuItem }) => (
  <header>
    <div className="navbar-container">
      <p className="navbar-logo primary-text-color">KEVVLAR</p>
      <Link className="navbar-button" to="/signup">
        sign up
      </Link>
    </div>
  </header>
);

export default NavBar;
