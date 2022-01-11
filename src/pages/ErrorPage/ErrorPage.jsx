import React from "react";
import { LoadingIcon } from "../../assets/svg/iconlibrary";

import "./errorPage.css";

const ErrorPage = () => (
  <div className="error-page">
    <LoadingIcon />
    Establishing connection...
  </div>
);

export default ErrorPage;
