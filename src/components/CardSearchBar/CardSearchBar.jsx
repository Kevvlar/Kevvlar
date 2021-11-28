import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";

import { enterSearchText } from "../../redux/index";

import "./Cardsearchbar.css";

const CardSearchBar = ({ inputSearchKey }) => (
  <div className="cardsearch-bar-container">
    <FaSearch className="cardsearch-icon" />
    <input
      type="text"
      placeholder="Search"
      className="cards-search"
    />
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (text) => dispatch(enterSearchText(text)),
  };
};

export default connect(null, mapDispatchToProps)(CardSearchBar);
