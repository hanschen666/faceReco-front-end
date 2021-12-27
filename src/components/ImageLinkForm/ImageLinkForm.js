import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">
        {"This Magic App will detect faces in your picture. Give it a try! 😎"}
      </p>

      <div className="center">
        <div className="pa4 br3 shadow-1">
          <input
            style={{ width: "450px" }}
            className="center f4 pa2 br2 "
            type="text"
            onChange={onInputChange}
          ></input>
          <p></p>
          <button
            onClick={onButtonSubmit}
            className="w-25 h-50 grow pointer br3 f4 dib white bg-light-blue"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
