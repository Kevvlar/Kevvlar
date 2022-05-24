import React from "react";
import * as classNames from "classnames";
import { connect } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";

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
  currentCard,
  boardId,
  user,
  isMe,
}) => {
  const currentDescription = card?.description;
  const history = useHistory();

  const newDescription = parse(currentDescription, {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === "iframe") {
        return <span>//figma iframe</span>;
      }
    },
  });

  const checkIfUserAssignedToCard = (usersArray) => {
    if (usersArray.length > 0) {
      if (usersArray.some((userItem) => userItem._id === user._id)) {
        return true;
      }
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            `card ${
              isMe && checkIfUserAssignedToCard(card.users) && "highlight-color"
            }`,
            snapshot.isDragging && "dragging"
          )}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onMouseDownCapture={() => {
            getCardData(card);
            getColumnData(column);
          }}
        >
          <div className="card-color-label-holder">
            <div
              style={{ backgroundColor: `${card?.colorLabel}` }}
              className="card-color-label"
            ></div>
          </div>
          <div className="cardlabelholder">
            <div id="card-label" className="card-label"></div>
          </div>
          <div className="card-inner">
            <p className="card-title">{card?.title}</p>
            {isGrid ? (
              <span>
                <div className="card-description">
                  {/* <ReactQuill
                    value={card?.description}
                    readOnly={true}
                    theme={"bubble"}
                  /> */}
                  {newDescription}
                </div>

                <div className="card-menu">
                  <p className="card-date">{card?.date}</p>
                  <div className="user-avatar-card-container">
                    {card?.users.slice(0, 3).map((user, index) => (
                      <img
                        key={index}
                        className="user-avatar-image card-avatar-image"
                        alt="img"
                        src={user.photo}
                        title={user.name}
                      />
                    ))}
                    {card?.users.length > 3 ? (
                      <div
                        className="card-avatar-more"
                        title={card.users.slice(3).map((user) => user.name)}
                      >
                        {"+" + (card.users.length - 3)}
                      </div>
                    ) : null}
                  </div>
                  <FaEllipsisH
                    onClick={() => {
                      history.push(`/boards/${boardId}/${currentCard.id}`);
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
};
const mapStateToProps = (state) => {
  return {
    isGrid: state.sideNavRight.isGrid,
    currentCard: state.column.selectCard,
    boardId: state.board.selectBoard.id,
    isMe: state.column.isMe,
    user: state.user.userData,
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
