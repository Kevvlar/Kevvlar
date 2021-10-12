import React from "react";

import Greeting from "../greeting/Greeting";
import Video from "../video/Video";
import Why from "../why-section/Why";
import Imagesection from "../image-section/ImageSection";

import "./directory.css";

const Directory = () => (
  <div className="directory-container">
    <Greeting />
    <Video />
    <Why />
    <Imagesection />
  </div>
);

export default Directory;
