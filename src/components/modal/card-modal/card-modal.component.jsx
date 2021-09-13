import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import "./card-modal.styles.css";

const CardModal = ({ hideModal }) => (
  <div className="modal">
    <div className="close-icon-container">
      <FaTimes onClick={hideModal} className="close-icon" />
    </div>
    <div className="modal-body">
      <input
        type="text"
        id="input-big"
        maxLength="50"
        placeholder="Card title"
        className="modal-body-title"
      />
      <textarea
        type="text"
        id="desc-big"
        maxLength="2000"
        placeholder="Write something..."
        className="modal-body-description"
      ></textarea>
      <div className="modal-checkbox-area">
        <div className="modal-checkbox-bar">
          <FaCheck className="modal-check-icon-check" />
          <div className="modal-progress-bar-contianer">
            <div id="cba182952" className="cbabarprogress"></div>
          </div>
          <div className="modal-progress-percentage">0 %</div>
        </div>
        <div className="modal-check-columns"></div>
        <input placeholder="+ Add item" className="modal-checkbox-input" />
      </div>
    </div>
    <div className="modal-footer-container">
      <input className="date-picker" type="date" name="Due Date" />
      <select className="select-color">
        <option value="">Color Label</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="blue">Blue</option>
      </select>
      <button className="delete-button">Delete</button>
    </div>
  </div>
);

export default CardModal;
