import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import icon from "./icon.png";
const Logo = () => {
  return (
    <div className="ma2 mt0 pt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 85 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "1px" }} alt="logo" src={icon}></img>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
