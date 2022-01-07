import React from "react";
import { Link } from "react-router-dom";
import {
  KevvlarLogo
} from "../../assets/svg/iconlibrary";

import "./navBar.css";

const NavBar = ({ menuItem }) => (
  <header>
    <div className="navbar-container">
      <KevvlarLogo />
      {/* <Link className="navbar-button" to="/signup">
        Try it
      </Link> */}
    </div>
  </header>
);

export default NavBar;
