import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";

import { enterSearchText } from "../../redux/index";

import "./searchBar.css";

const SearchBar = ({ inputSearchKey }) => (
  <div className="search-bar-container">
    <FaSearch className="search-icon" />
    <input
      type="text"
      placeholder="Search"
      className="boards-search"
      onChange={(e) => inputSearchKey(e.target.value.toLocaleLowerCase())}
    />
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (text) => dispatch(enterSearchText(text)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
