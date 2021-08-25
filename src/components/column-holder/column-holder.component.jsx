import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import Column from "../column/column.component";

import "./column-holder.styles.css";

const ColumnHolder = () => (
  <ScrollContainer
    className="scroll-container"
    vertical={true}
    horizontal={true}
  >
    <div className="column-holder">
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  </ScrollContainer>
);
export default ColumnHolder;
