import React from "react";
import { FaEllipsisH } from "react-icons/fa";

import "./card.styles.css";

const Card = () => (
  <div className="card">
    <div className="cardlabelholder">
      <div id="card-label" className="cardlabel"></div>
    </div>
    <div className="card-inner">
      <p className="card-title">Title</p>
      <p className="card-description">some description goes here</p>
      <div className="card-menu">
        <p className="card-date">18/02/2021</p>
        <FaEllipsisH className="card-more-icon" />
      </div>
    </div>
  </div>
);

export default Card;
