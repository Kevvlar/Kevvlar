import React from "react";

import "./video.styles.css";

const Video = () => (
  <div className="video-container">
    <video
      className="video-controller"
      controls="controls"
      loop="loop"
      src="https://www.kevvlar.com/static/media/prog.0f550ed.mp4"
      type="video/mp4"
    />
  </div>
);

export default Video;
