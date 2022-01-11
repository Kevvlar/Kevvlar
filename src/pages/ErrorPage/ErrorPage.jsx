import React from "react";
import { LoadingIcon } from "../../assets/svg/iconlibrary";

import "./errorPage.css";

const ErrorPage = () => (
  <div className="error-page">
    <LoadingIcon />
    <h2 className="error-page-h2">Establishing connection...</h2>
  </div>
);

export default ErrorPage;
