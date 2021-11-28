import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";

import { enterCardSearchKey } from "../../redux/index";

import "./Cardsearchbar.css";

const CardSearchBar = ({ inputSearchKey }) => (
  <div className="cardsearch-bar-container">
    <FaSearch className="cardsearch-icon" />
    <input
      type="text"
      placeholder="Search"
      className="cards-search"
      onChange={(e) => inputSearchKey(e.target.value.toLocaleLowerCase())}
    />
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (keyWord) => dispatch(enterCardSearchKey(keyWord)),
  };
};

export default connect(null, mapDispatchToProps)(CardSearchBar);
