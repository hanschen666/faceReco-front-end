import React from "react";
import "./FaceRecognition.css";
const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          id="img"
          width="500px"
          height="auto"
          className="ma1"
          alt=""
          src={imageUrl}
        ></img>
        <div
          className="bounding-box"
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
