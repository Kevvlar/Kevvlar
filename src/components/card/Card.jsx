import React from "react";
import * as classNames from "classnames";
import { connect } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import {
  setCardModal,
  setCurrentColumnData,
  setCurrentCardData,
} from "../../redux/index";

import "./card.css";

const Card = ({
  card,
  index,
  isGrid,
  editCardModal,
  column,
  getColumnData,
  getCardData,
}) => (
  <Draggable draggableId={card.id} index={index}>
    {(provided, snapshot) => (
      <div
        className={classNames("card", snapshot.isDragging && "dragging")}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        onMouseDown={() => {
          getColumnData(column);
          getCardData(card);
        }}
      >
        <div className="card-color-label-holder">
          <div
            style={{ backgroundColor: `${card.colorLabel}` }}
            className="card-color-label"
          ></div>
        </div>
        <div className="cardlabelholder">
          <div id="card-label" className="card-label"></div>
        </div>
        <div className="card-inner">
          <p className="card-title">{card.title}</p>
          {isGrid ? (
            <span>
              <div className="card-description">
                <ReactQuill
                  value={card.description}
                  readOnly={true}
                  theme={"bubble"}
                />
              </div>
              <div className="card-menu">
                <p className="card-date">{card.date}</p>
                <FaEllipsisH
                  onClick={() => {
                    getCardData(card);
                    getColumnData(column);
                    editCardModal("EDIT");
                  }}
                  className="card-more-icon"
                />
              </div>
            </span>
          ) : null}
        </div>
      </div>
    )}
  </Draggable>
);

const mapStateToProps = (state) => {
  return {
    isGrid: state.sideNavRight.isGrid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCardModal: (type) => dispatch(setCardModal(type)),
    getColumnData: (columnObj) => dispatch(setCurrentColumnData(columnObj)),
    getCardData: (cardObj) => dispatch(setCurrentCardData(cardObj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
