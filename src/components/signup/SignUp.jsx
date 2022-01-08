import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { KevvlarIcon } from "../../assets/svg/iconlibrary";
import { LoadingIcon } from "../../assets/svg/iconlibrary";

import { signUserUp, clearErrorMessage } from "../../redux";
import "./signup.css";

const SignUp = ({ signUpUser, history, loading, error, clearError }) => {
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
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="signup-content">
          <KevvlarIcon />
          <h2 className="signup-white">Sign Up</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="sign-in-form-group">
              <div className="sign-in-error">{error}</div>
            </div>
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
            <Link
              onClick={() => {
                clearError();
              }}
              to="/signin"
              className="signup-form-login-link"
            >
              Log in here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (userData, history) => dispatch(signUserUp(userData, history)),
    clearError: () => dispatch(clearErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
