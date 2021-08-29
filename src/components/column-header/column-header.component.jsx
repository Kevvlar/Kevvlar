import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import "./column-header.styles.css";

const ColumnHeader = ({ title }) => (
  <div className="column-header-container">
    <p className="column-header-title">{title}</p>
    <div className="column-header-icon-container">
      <FaTrash className="column-header-trash-icon" />
      <FaEdit className="column-header-edit-icon" />
    </div>
  </div>
);

export default ColumnHeader;
