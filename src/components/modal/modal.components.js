import { FaCheck } from "react-icons/fa";

/**
 * Create custom modal to be render
 * Create the modal fucntiion and return the html to be rendered
 * NOTE html tags must be put inside the tags below to maintain consistent styles and behaviour
 * <div className="modal">
 * <div className="modal-body">
 * your html code goes here
 * </div>
 * </div>
 */

export const cardModal = () => (
  <div className="modal">
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
      <button className="colorlabel-button">Color Label</button>
      <button className="delete-button">Delete</button>
    </div>
  </div>
);

export const boardModal = () => (
  <div className="modal">
    <div className="modal-body">
      <h2>Add new board</h2>
    </div>
    <div className="modal-footer-container">
      <button>Save</button>
    </div>
  </div>
);

export const columnModal = () => (
  <div className="modal">
    <div className="modal-body">
      <h2>Add new Column</h2>
    </div>
    <div className="modal-footer-container">
      <button>Save</button>
    </div>
  </div>
);
