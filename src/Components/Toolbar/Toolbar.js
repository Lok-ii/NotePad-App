import React from "react";
import "./toolbar.css";

const Toolbar = (props) => {
  const toggleSection = (e) => {
    if (e.target.innerText === "Write" && props.preview) {
      props.setPreview(!props.preview);
    } else if (e.target.innerText === "Preview" && !props.preview) {
      props.setPreview(!props.preview);
    }
  };
  return (
    <div className="toolbar">
      <div className="buttons">
        <button onClick={toggleSection} autoFocus>Write</button>
        <button onClick={toggleSection}>Preview</button>
      </div>

      {!props.preview ? <div className="toolsList">
      <div className="textTools">
      <i class="fa-solid fa-heading"></i>
      <i class="fa-solid fa-bold"></i>
      <i class="fa-solid fa-italic"></i>
      <i class="fa-solid fa-strikethrough"></i>
      </div>
      <div className="linkTools">
      <i class="fa-solid fa-link"></i>
      <i class="fa-solid fa-quote-right"></i>
      <i class="fa-solid fa-code"></i>
      <i class="fa-solid fa-image"></i>
      </div>
      <div className="listTools">
      <i class="fa-solid fa-list-ul"></i>
      <i class="fa-solid fa-list-ol"></i>
      <i class="fa-solid fa-list-check"></i>
      </div>
      </div> : " "}
    </div>
  );
};

export default Toolbar;
