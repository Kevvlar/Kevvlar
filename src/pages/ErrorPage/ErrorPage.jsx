import React from "react";
import { LoadingIcon } from "../../assets/svg/iconlibrary";
import { withRouter } from "react-router-dom";

import "./errorPage.css";

class ErrorPage extends React.Component {
  componentDidMount() {
    window.ononline = (event) => {
      this.props.history.goBack();
    };
  }

  render() {
    return (
      <div className="error-page">
        <LoadingIcon />
        <h2 className="error-page-h2">Establishing connection</h2>
      </div>
    );
  }
}

export default withRouter(ErrorPage);
