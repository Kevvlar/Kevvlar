import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";

import { authenticate } from "../auth";

import "./signup.css";

const SignUp = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "http://localhost:8000/api/v1/users/signup",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((response) => {
        authenticate(response.data.token, () => {
          setName("");
          setEmail("");
          setPassword("");
          setIsLoading(false);
          history.push("/app");
        });
      })
      .catch((error) => {
        const errorMsg = error.response.data.message;
        setErrorMessage(errorMsg);
        setIsLoading(false);
      });
  };

  return (
    <div className="signup-container">
      {!isLoading ? (
        <div className="signup-content">
          <form onSubmit={handleSubmit} className="signup-form">
            <h2 className="signup-form-title">
              {!errorMessage ? "SIGN UP" : errorMessage}
            </h2>
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
            Have already an account ?
            <Link to="/signin" className="signup-form-login-link">
              Sign in here
            </Link>
          </p>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default withRouter(SignUp);
