import React from "react";
import { connect } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

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
  columnId,
  columnTitle,
  getColumnData,
  getCardData,
}) => (
  <Draggable draggableId={card.id} index={index}>
    {(provided) => (
      <div
        className="card"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        onMouseDown={() => {
          getColumnData({
            id: columnId,
            title: columnTitle,
          });
          getCardData(card);
        }}
      >
        <div className="cardlabelholder">
          <div id="card-label" className="card-label"></div>
        </div>
        <div className="card-inner">
          <p className="card-title">{card.title}</p>
          {isGrid ? (
            <span>
              <p className="card-description">{card.description}</p>
              <div className="card-menu">
                <p className="card-date">{card.date}</p>
                <FaEllipsisH
                  onClick={() => {
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
