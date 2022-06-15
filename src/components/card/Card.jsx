import React from "react";
import * as classNames from "classnames";
import { connect } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import parse from "html-react-parser";
import { useHistory } from "react-router-dom";

import {
  setCardModal,
  setCurrentColumnData,
  setCurrentCardData,
  resetIsMe,
  clearCardSearchKey,
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
  searchKeyWord,
  clearIsMe,
  clearCardSearch,
}) => {
  const currentDescription = card?.description;
  const history = useHistory();

  const newDescription = parse(currentDescription, {
    replace: (domNode) => {
      if (domNode.attribs && domNode.name === "iframe") {
        return <span></span>; // remove this from span "//figma iframe"
      }
    },
  });

  const checkIfUserAssignedToCard = (usersArray) => {
    if (usersArray.length > 0 && isMe) {
      if (usersArray.some((userItem) => userItem._id === user._id)) {
        return true;
      }
    }
  };

  const searchMatch = (title, description) => {
    const parsedTitle = title.toLowerCase().replace(/\s/g, "");
    const parsedDescription = description.toLowerCase().replace(/\s/g, "");

    if (searchKeyWord) {
      if (
        parsedTitle.includes(searchKeyWord) ||
        parsedDescription.includes(searchKeyWord)
      ) {
        return true;
      }
    }
  };

  const isHighLighted = (userArray, title, description) => {
    if (checkIfUserAssignedToCard(userArray)) {
      return true;
    } else if (searchMatch(title, description)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            `card ${
              isHighLighted(card.users, card.title, card.description) &&
              "highlight-color"
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
    searchKeyWord: state.column.cardSearchKeyWord,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCardModal: (type) => dispatch(setCardModal(type)),
    getColumnData: (columnObj) => dispatch(setCurrentColumnData(columnObj)),
    getCardData: (cardObj) => dispatch(setCurrentCardData(cardObj)),
    clearIsMe: () => dispatch(resetIsMe()),
    clearCardSearch: () => dispatch(clearCardSearchKey()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
