import React from "react";
import { useState } from "react";

import GetStartedButon from "../get-started-button/GetStartedButton";

import "./greeting.css";

function Greeting() {
  // const [showPricing, setShowPricing] = useState(false);

  // const handleClick = () => {
  //   setShowPricing(true);
  // };

  // const handleShowPricing = () => (
  //   <div className="donate-container">
  //     <p style={{ color: "#2196f3" }}>Free! But donations are appreciated.</p>{" "}
  //     <button className="donatebutton">Donate</button>
  //   </div>
  // );

  const [input, setInput] = useState("");

  const [showButton, setShowButton] = useState(false);

  const handlePassword = (e) => {
    e.preventDefault();
    if (input.includes("beta")) {
      setShowButton(true);
    }
  };

  return (
    <div className="greeting-container section-margin">
      <h2 className="greeting-heading">Currently In Development</h2>
      <h5 className="greeting-main-text primary-text-color">
        Feel free to try it and give us feedback! (Data might be deleted at any
        point)
      </h5>
      <div className="greeting-buttons-container">
        {/* <GetStartedButon /> */}
        <form onSubmit={handlePassword}>
          <input
            value={input}
            type="text"
            placeholder="password"
            className="modal-board-text"
            onInput={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      {showButton ? <GetStartedButon /> : null}
    </div>
  );
}

export default Greeting;
