import React from "react";
import { Link } from "react-router-dom";

import "./login.styles.css";

const LogIn = () => (
  <div className="login-container">
    <div className="login-content">
      <form method="POST" id="login-form" className="login-form">
        <h2 className="login-form-title">Login</h2>
        <div className="login-form-group">
          <input
            type="text"
            className="login-form-input"
            name="name"
            id="name"
            placeholder="Your Name"
          />
        </div>
        <div className="login-form-group">
          <input
            type="email"
            className="login-form-input"
            name="email"
            id="email"
            placeholder="Your Email"
          />
        </div>
        <div className="login-form-group">
          <input
            type="text"
            className="login-form-input"
            name="password"
            id="password"
            placeholder="Password"
          />
          <span
            toggle="#password"
            className="zmdi zmdi-eye field-icon toggle-password"
          ></span>
        </div>

        <div className="login-form-group">
          <input
            type="submit"
            name="submit"
            id="submit"
            className="login-form-submit"
            value="Login"
          />
        </div>
      </form>
      <p className="loginhere">
        Don't have an account ?{" "}
        <Link to="/login" className="login-form-login-link">
          Signup here
        </Link>
      </p>
    </div>
  </div>
);

export default LogIn;
