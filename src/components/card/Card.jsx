import React from "react";
import { connect } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import moment from "moment";

import { setCardModal, setCardData } from "../../redux/index";

import "./card.css";

const Card = ({ card, index, isGrid, editCardModal, setCurrentCardData }) => (
  <Draggable draggableId={card._id} index={index}>
    {(provided) => (
      <div
        className="card"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
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
                <p className="card-date">{moment(card.date).format()}</p>
                <FaEllipsisH
                  onClick={() => {
                    editCardModal("EDIT");
                    setCurrentCardData({
                      id: card._id,
                      title: card.title,
                      description: card.description,
                      date: card.date,
                      color: card.colorLabel,
                    });
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
    setCurrentCardData: (data) => dispatch(setCardData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
