import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";

import {
  enterCardSearchKey,
  resetIsMe,
  clearCardSearchKey,
} from "../../redux/index";

import "./Cardsearchbar.css";

function CardSearchBar({
  inputSearchKey,
  clearIsMe,
  searchKeyWord,
  isMe,
  clearCardSearch,
}) {
  const handleInputChange = (e) => {
    e.preventDefault();
    clearIsMe();
    inputSearchKey(e.target.value.toLocaleLowerCase().replace(/\s/g, ""));
  };

  const clearInput = () => {
    clearCardSearch();
  };

  return (
    <div
      className={
        searchKeyWord !== "" && !isMe
          ? "cardsearch-bar-container cardsearch-margin-fix"
          : "cardsearch-bar-container"
      }
    >
      <FaSearch className="cardsearch-icon" />
      <input
        type="text"
        placeholder="Search"
        className={
          searchKeyWord !== "" && !isMe
            ? "cards-search search-focused"
            : "cards-search"
        }
        value={searchKeyWord}
        onChange={handleInputChange}
      />
      {searchKeyWord !== "" && !isMe ? (
        <div className="clear-search-button" onClick={clearInput}>
          x
        </div>
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    searchKeyWord: state.column.cardSearchKeyWord,
    isMe: state.column.isMe,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (keyWord) => dispatch(enterCardSearchKey(keyWord)),
    clearIsMe: () => dispatch(resetIsMe()),
    clearCardSearch: () => dispatch(clearCardSearchKey()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSearchBar);
