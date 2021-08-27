import React from "react";

import Greeting from "../greeting/greeting.component";
import Video from "../video/video.component";
import Why from "../why-section/why.component";
import Imagesection from "../image-section/image-section.component"

import "./directory.styles.css";

const Directory = () => (
  <div className="directory-container">
    <Greeting />
    <Video />
    <Why />
    <Imagesection />
  </div>
);

export default Directory;
