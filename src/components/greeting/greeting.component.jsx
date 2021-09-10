import React, { useState } from "react";

import GetStartedButon from "../get-started-button/get-started-button.component";

import "./greeting.styles.css";

function Greeting() {
  const [showPricing, setShowPricing] = useState(false);

  const handleClick = () => {
    setShowPricing(true);
  };

  const handleShowPricing = () => (
    <div className="donate-container">
      <p style={{ color: "#2196f3" }}>Free! But donations are appreciated.</p>{" "}
      <button className="donatebutton">Donate</button>
    </div>
  );

  return (
    <div className="greeting-container section-margin">
      <h2 className="greeting-heading">Simple. Fast. Clean.</h2>
      <h5 className="greeting-main-text primary-text-color">
        Everyone could use some better organization, so we built an app just for
        that. With dead-simple drag and drop functionality and color coded
        notes, you will be sure to finish your work faster and never miss a
        thing.
      </h5>
      <div className="greeting-buttons-container">
        <GetStartedButon />
        <div onClick={handleClick} className="greeting-pricing-link">
          Pricing
        </div>
      </div>
      {showPricing ? handleShowPricing() : null}
    </div>
  );
}

export default Greeting;
