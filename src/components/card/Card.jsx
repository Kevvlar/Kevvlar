import React from "react";
import { connect } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

import "./card.css";

const Card = ({ card, index, isGrid }) => (
  <Draggable draggableId={card.id} index={index}>
    {(provided) => (
      <div
        className="card"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <div className="cardlabelholder">
          <div id="card-label" className="cardlabel"></div>
        </div>
        <div className="card-inner">
          <p className="card-title">{card.title}</p>
          {isGrid ? (
            <span>
              <p className="card-description">{card.content}</p>
              <div className="card-menu">
                <p className="card-date">18/02/2021</p>
                <FaEllipsisH
                  onClick={() => alert("Feature coming soon...")}
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

export default connect(mapStateToProps, null)(Card);
