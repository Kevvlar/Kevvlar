import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

import "./card.styles.css";

const Card = ({ task, index, showModal, setCardActionType, isGrid }) => (
  <Draggable draggableId={task.id} index={index}>
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
          <p className="card-title">{task.title}</p>
          {isGrid ? (
            <span>
              <p className="card-description">{task.content}</p>
              <div className="card-menu">
                <p className="card-date">18/02/2021</p>
              </div>
            </span>
          ) : null}
          <FaEllipsisH
            onClick={() => {
              setCardActionType();
              showModal();
            }}
            className="card-more-icon"
          />
        </div>
      </div>
    )}
  </Draggable>
);

export default Card;
