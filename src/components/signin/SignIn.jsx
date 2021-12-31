import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signUserIn } from "../../redux";

import "./signin.css";

import {
  KevvlarIcon
} from "../../assets/svg/iconlibrary";

const SignIn = ({ signInUser, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signInUser(
      {
        userEmail: email,
        userPassword: password,
      },
      history
    );
    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-content">
        <KevvlarIcon />
        <h2 className="sign-in-white">Log in</h2>
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="sign-in-form-group">
            <input
              type="email"
              className="sign-in-form-input"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="sign-in-form-group">
            <input
              type="password"
              className="sign-in-form-input"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sign-in-form-submit-button">
            Log in
          </button>
        </form>
        <p className="sign-in-here">
          Don't have an account?{" "}
          <Link to="/signup" className="sign-in-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userData, history) => dispatch(signUserIn(userData, history)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
