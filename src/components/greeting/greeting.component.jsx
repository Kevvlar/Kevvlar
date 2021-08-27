import React, { useState } from "react";

import "./greeting.styles.css";

function Greeting() {
  const [showDiv, setShowDiv] = useState(false);

  const onClick = () => setShowDiv(true);

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
        <button className="greeting-button-get-started">Get Started</button>
        <div onClick={onClick} className="greeting-pricing-link">
          Pricing
        </div>
      </div>
    </div>
  );
}


export default Greeting;
