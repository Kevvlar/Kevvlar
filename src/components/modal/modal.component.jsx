import React from "react";
import { FaCheck } from "react-icons/fa";

import "./modal.styles.css";

const Modal = () => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-header">Header</div>
        <div className="modal-body">
          <p>
            <input
              type="text"
              id="input-big"
              maxlength="2000"
              placeholder="Card title"
              className="modal-body-title"
            />
          </p>
          <p>
            <textarea
              type="text"
              id="desc-big"
              maxlength="2000"
              value="Write something..."
              className="modal-body-description"
            ></textarea>
          </p>
          <div className="modal-checkbox-area">
            <div className="modal-checkbox-bar">
              <FaCheck className="modal-check-icon-check" />
              <div className="modal-progress-bar-contianer">
                <div id="cba182952" className="cbabarprogress"></div>
              </div>
              <div className="modal-progress-percentage">0 %</div>
            </div>
            <div className="modal-check-columns"></div>
            <input placeholder="+ Add item" className="modal-checkboxinput" />
          </div>
        </div>
        <div className="modal-footer-container">Footer</div>
      </div>
    </div>
  );
};

export default Modal;
