import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./signup.css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const signUpData = this.state;

    fetch("http://localhost:8000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.setState({ name: "", password: "", email: "" });
          localStorage.setItem("token", data.token);
          this.props.history.push("/app");
        } else if (data.status === "error") {
          alert("Error signing user up; please try signing up again");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="signup-container">
        <div className="signup-content">
          <form onSubmit={this.handleSubmit} className="signup-form">
            <h2 className="signup-form-title">Create account</h2>
            <div className="signup-form-group">
              <input
                type="text"
                className="signup-form-input"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={this.handleChange}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                required
              />
            </div>

            <div to="/app" className="signup-form-group">
              <button type="submit" className="signup-form-submit">
                Sign Up
              </button>
            </div>
          </form>
          <p className="loginhere">
            Have already an account ?{" "}
            <Link to="/signin" className="signup-form-login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
