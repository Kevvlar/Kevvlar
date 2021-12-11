import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signUserIn } from "../../redux";

import "./signin.css";

const SignIn = ({ signInUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signInUser({
      userEmail: email,
      userPassword: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-content">
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
            Sign in
          </button>
        </form>
        <p className="sign-in-here">
          Don't have an account ?{" "}
          <Link to="/signup" className="sign-in-link">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userData) => dispatch(signUserIn(userData)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
