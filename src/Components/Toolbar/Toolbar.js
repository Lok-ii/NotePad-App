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

  const applyHeading = () => {
    props.setMarkdown((prevMarkdown) => {
      const cursorPos = document.getElementsByTagName("textarea")[0].selectionStart;
      const newMarkdown = prevMarkdown.substring(0, cursorPos) + '### ' + prevMarkdown.substring(cursorPos);
      return newMarkdown;
    });
  };
  

  const applyBold = () => {
    props.setMarkdown((prevMarkdown) => {
      const cursorPos = document.getElementsByTagName("textarea")[0].selectionStart;
      const selectedText = window.getSelection().toString();
      const boldText = `**${selectedText}**`;
      const newMarkdown = prevMarkdown.substring(0, cursorPos) + boldText + prevMarkdown.substring(cursorPos + selectedText.length);
      return newMarkdown;
    });
  };
  

  const applyItalic = () => {
    props.setMarkdown((prevMarkdown) => {
      const cursorPos = document.getElementsByTagName("textarea")[0].selectionStart;
      const selectedText = window.getSelection().toString();
      const italicText = `*${selectedText}*`;
      const newMarkdown = prevMarkdown.substring(0, cursorPos) + italicText + prevMarkdown.substring(cursorPos + selectedText.length);
      return newMarkdown;
    });
  };
  
  

  const applyStrikethrough = () => {
    props.setMarkdown((prevMarkdown) => {
      const cursorPos = document.getElementsByTagName("textarea")[0].selectionStart;
      const selectedText = window.getSelection().toString();
      const strikethroughText = `~~${selectedText}~~`;
      const newMarkdown = prevMarkdown.substring(0, cursorPos) + strikethroughText + prevMarkdown.substring(cursorPos + selectedText.length);
      return newMarkdown;
    });
  };
  
  
  return (
    <div className="toolbar">
      <div className="buttons">
        <button onClick={toggleSection} autoFocus>
          Write
        </button>
        <button onClick={toggleSection}>Preview</button>
      </div>

      {!props.preview ? (
        <div className="toolsList">
          <div className="textTools">
            <i class="fa-solid fa-heading" onClick={applyHeading}></i>
            <i class="fa-solid fa-bold" onClick={applyBold}></i>
            <i class="fa-solid fa-italic" onClick={applyItalic}></i>
            <i class="fa-solid fa-strikethrough" onClick={applyStrikethrough}></i>
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
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default Toolbar;
