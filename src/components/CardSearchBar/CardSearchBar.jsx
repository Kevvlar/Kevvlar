import React from "react";
import { connect } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import { enterCardSearchKey } from "../../redux/index";

import "./Cardsearchbar.css";

function CardSearchBar({inputSearchKey}) {
  const [inputValue, setInputValue] = useState('');
  const [showButton, setShowButton] = useState(false);

  
  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    inputSearchKey(e.target.value.toLocaleLowerCase().replace(/\s/g, ""));
  }

  const clearInput = (e) => {
    e.preventDefault();
    setInputValue(e.target.value = '');
    inputSearchKey(e.target.value = '');
  }

  return (
    <div className={inputValue.trim() ? "cardsearch-bar-container cardsearch-margin-fix" : "cardsearch-bar-container"}>
      <FaSearch className="cardsearch-icon" />
      <input
        type="text"
        placeholder="Search"
        className={inputValue.trim() ? "cards-search search-focused" : "cards-search"}
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue.trim() ? <div className="clear-search-button" onClick={clearInput}>x</div> : null}
    </div>
  )
};

{/*  const CardSearchBar = ({ inputSearchKey }) => (
   <div className="cardsearch-bar-container">
     <FaSearch className="cardsearch-icon" />
     <input
       type="text"
       placeholder="Search"
       className="cards-search"
       value={inputValue}
       onChange={(e) =>
         inputSearchKey(e.target.value.toLocaleLowerCase().replace(/\s/g, ""))
       }
     />
     <div className="clear-search-button" onClick={(e) => inputSearchKey(e.target.value = '')}>x</div>
   </div>
 ); */}

const mapDispatchToProps = (dispatch) => {
  return {
    inputSearchKey: (keyWord) => dispatch(enterCardSearchKey(keyWord)),
  };
};

export default connect(null, mapDispatchToProps)(CardSearchBar);
