import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./signin.styles.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Sign in fucntion");
    this.props.history("/app");
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in-content">
          <form onSubmit={this.handleSubmit} className="sign-in-form">
            <h2 className="sign-in-form-title">SIGN IN</h2>
            <div className="sign-in-form-group">
              <input
                type="email"
                className="sign-in-form-input"
                name="email"
                placeholder="Your Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="sign-in-form-group">
              <input
                type="password"
                className="sign-in-form-input"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
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
  }
}

export default withRouter(SignIn);
