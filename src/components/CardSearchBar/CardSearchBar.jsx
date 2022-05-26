import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import { enterCardSearchKey, resetIsMe } from "../../redux/index";

import "./Cardsearchbar.css";

function CardSearchBar({ inputSearchKey, clearIsMe, searchKeyWord }) {
  const [inputValue, setInputValue] = useState(searchKeyWord);

  const handleInputChange = (e) => {
    e.preventDefault();
    clearIsMe();
    setInputValue(e.target.value);
    inputSearchKey(e.target.value.toLocaleLowerCase().replace(/\s/g, ""));
  };

  const clearInput = (e) => {
    e.preventDefault();
    setInputValue((e.target.value = ""));
    inputSearchKey((e.target.value = ""));
  };

  return (
    <div
      className={
        inputValue.trim()
          ? "cardsearch-bar-container cardsearch-margin-fix"
          : "cardsearch-bar-container"
      }
    >
      <FaSearch className="cardsearch-icon" />
      <input
        type="text"
        placeholder="Search"
        className={
          inputValue.trim() ? "cards-search search-focused" : "cards-search"
        }
        value={searchKeyWord}
        onChange={handleInputChange}
      />
      {inputValue ? (
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (keyWord) => dispatch(enterCardSearchKey(keyWord)),
    clearIsMe: () => dispatch(resetIsMe()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardSearchBar);
