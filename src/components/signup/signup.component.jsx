import React from "react";
import { Link } from "react-router-dom";

import "./signup.styles.component.css";

const SignUp = () => (
  <div className="signup-container">
    <div className="signup-content">
      <form id="signup-form" className="signup-form">
        <h2 className="signup-form-title">Create account</h2>
        <div className="signup-form-group">
          <input
            type="text"
            className="signup-form-input"
            name="name"
            id="name"
            placeholder="Your Name"
          />
        </div>
        <div className="signup-form-group">
          <input
            type="email"
            className="signup-form-input"
            name="email"
            id="email"
            placeholder="Your Email"
          />
        </div>
        <div className="signup-form-group">
          <input
            type="text"
            className="signup-form-input"
            name="password"
            id="password"
            placeholder="Password"
          />
          <span
            toggle="#password"
            className="zmdi zmdi-eye field-icon toggle-password"
          ></span>
        </div>

        <Link to="/app" className="signup-form-group">
          <input
            type="submit"
            name="submit"
            id="submit"
            className="signup-form-submit"
            value="Sign up"
          />
        </Link>
      </form>
      <p className="loginhere">
        Have already an account ?{" "}
        <Link to="/login" className="signup-form-login-link">
          Login here
        </Link>
      </p>
    </div>
  </div>
);

export default SignUp;
