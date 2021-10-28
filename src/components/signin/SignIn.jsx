import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

import { authenticate } from "../auth";

import "./signin.css";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        "http://localhost:8000/api/v1/users/signin",
        {
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
    <div className="sign-in-container">
      {!isLoading ? (
        <div className="sign-in-content">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="signup-form-title">
              {!errorMessage ? "SIGN IN" : errorMessage}
            </h2>
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
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
};

export default withRouter(SignIn);
