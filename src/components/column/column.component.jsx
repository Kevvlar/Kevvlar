import React from "react";

import ColumnHeader from "../column-header/column-header.component";
import Card from "../card/card.component";

import "./column.styles.css";

const Column = ({ length }) => (
  <div className="column">
    <ColumnHeader />
    <div className="card-container">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  </div>
);

export default Column;
