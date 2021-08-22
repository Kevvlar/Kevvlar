import React from "react";

import Greeting from "../greeting/greeting.component";
import Video from "../video/video.component";

import "./directory.styles.css";

const Directory = () => (
  <div className="directory-container">
    <Greeting />
    <Video />
  </div>
);

export default Directory;
