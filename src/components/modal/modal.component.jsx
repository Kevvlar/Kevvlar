import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

import "./modal.styles.css";

const Modal = ({ hideModal }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-close-overlay" onClick={hideModal}></div>
      <div className="modal">
        <div className="close-icon-container">
          <FaTimes className="close-icon" onClick={hideModal} />
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
          >
          </textarea>
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
          <p>
            <input className="date-picker" type="date" name="Due Date" />
          </p>
          <p>
            <button className="colorlabel-button">Color Label</button>
          </p>
          <p>
            <button className="delete-button">Delete</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
