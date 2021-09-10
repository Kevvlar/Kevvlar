import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./signup.styles.component.css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sign up fucntion");
    this.props.history("/app");
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { fullName, email, password, confirmPassword } = this.state;
    return (
      <div className="signup-container">
        <div className="signup-content">
          <form onSubmit={this.handleSubmit} className="signup-form">
            <h2 className="signup-form-title">Create account</h2>
            <div className="signup-form-group">
              <input
                type="text"
                className="signup-form-input"
                name="fullName"
                placeholder="Your Name"
                value={fullName}
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

            <div className="signup-form-group">
              <input
                type="password"
                className="signup-form-input"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
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
