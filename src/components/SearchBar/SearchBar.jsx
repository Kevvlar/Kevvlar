import React from "react";
import { connect } from "react-redux";

import { enterSearchText } from "../../redux/index";

import "./searchBar.css";

const SearchBar = ({ inputSearchKey }) => (
  <input
    type="text"
    placeholder="Search"
    className="boards-search"
    onChange={(e) => inputSearchKey(e.target.value)}
  />
);

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (text) => dispatch(enterSearchText(text)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
