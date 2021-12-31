import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { signUserUp } from "../../redux";

import "./signup.css";

import {
  KevvlarIcon
} from "../../assets/svg/iconlibrary";

const SignUp = ({ signUpUser, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpUser(
      {
        name: name,
        email: email,
        password: password,
      },
      history
    );
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <KevvlarIcon />
        <h2 className="signup-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-form-group">
            <input
              type="text"
              className="signup-form-input"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-group">
            <input
              type="email"
              className="signup-form-input"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-group">
            <input
              type="password"
              className="signup-form-input"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <button type="submit" className="signup-form-submit">
              Sign Up
            </button>
          </div>
        </form>
        <p className="loginhere">
          Already have an account?{" "}
          <Link to="/signin" className="signup-form-login-link">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (userData, history) => dispatch(signUserUp(userData, history)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
