import React from "react";

import GetStartedButton from "../get-started-button/get-started-button.component";

import "./image-section.styles.css";

function Imagesection() {
  return (
    <div className="greeting-container padding-top section-margin">
      <h2 className="greeting-heading">Why Us Instead of Other Apps?</h2>
      <div className="segment-holder">
        <div className="image-holder">
          <img
            src="https://icons8.com/wp-content/uploads/2020/03/dashboard-design-1.png"
            width="400px"
            alt=""
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="image-section-holder">
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

export default Imagesection;
