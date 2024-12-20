import React from "react";
import "./imagelinkform.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 center">{`This Magic Brain will detect faces in your pictures. Give it a try. `}</p>
            <div className="center">
                <div className="center pa4 br3 shadow-5">
                    <input
                        className="f4 pa2 w-70 center"
                        type="text"
                        onChange={onInputChange}
                    />
                    <button
                        onClick={onButtonSubmit}
                        className="w-30 grow f4 link pv2 dib white bg-light-purple"
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
