import React, { useState } from "react";

import "./why.styles.css";

function Why() {
  const [showDiv, setShowDiv] = useState(false);

  const onClick = () => setShowDiv(true);

  return (
    <div className="greeting-container padding-top section-margin">
      <h2 className="greeting-heading">Why Us Instead of Other Apps?</h2>
      <div className="segment-holder">
        <div className="segment-section-holder">
          <h3 className="segment-section-title">Title number 1</h3>
          <h5 className="greeting-main-text primary-text-color">
            Everyone could use some better organization, so we built an app just for
            that.
          </h5>
        </div>
        <div className="segment-section-holder">
          <h3 className="segment-section-title">Title number 1</h3>
          <h5 className="greeting-main-text primary-text-color">
            Everyone could use some better organization, so we built an app just for
            that.
          </h5>
        </div>
        <div className="segment-section-holder">
          <h3 className="segment-section-title">Title number 1</h3>
          <h5 className="greeting-main-text primary-text-color">
            Everyone could use some better organization, so we built an app just for
            that.
          </h5>
        </div>
      </div>
      <div className="greeting-buttons-container">
        <button className="greeting-button-get-started">Get Started</button>
      </div>
    </div>
  );
}


export default Why;