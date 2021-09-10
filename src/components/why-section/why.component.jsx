import React from "react";

import GetStartedButton from "../get-started-button/get-started-button.component";

import "./why.styles.css";

function Why() {
  return (
    <div className="greeting-container padding-top section-margin">
      <h2 className="greeting-heading">Why Us Instead of Other Apps?</h2>
      <div className="segment-holder">
        <div className="segment-section-holder">
          <h3 className="segment-section-title">Title number 1</h3>
          <h5 className="greeting-main-text primary-text-color">
            Everyone could use some better organization, so we built an app just
            for that.
          </h5>
        </div>
        <div className="segment-section-holder">
          <h3 className="segment-section-title">Title number 1</h3>
          <h5 className="greeting-main-text primary-text-color">
            Everyone could use some better organization, so we built an app just
            for that.
          </h5>
        </div>
        <div className="segment-section-holder">
          <h3 className="segment-section-title">Title number 1</h3>
          <h5 className="greeting-main-text primary-text-color">
            Everyone could use some better organization, so we built an app just
            for that.
          </h5>
        </div>
      </div>
      <GetStartedButton />
    </div>
  );
}

export default Why;
