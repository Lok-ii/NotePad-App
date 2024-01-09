// import React from 'react';
// import "./write.css";

// const Write = (props) => {

//     const changeContent = (e)=>{
//         props.setMarkdown(()=>{
//             let newValue = e.target.value;
//             props.setData((prev)=>{
//                 const newData = prev.map((item)=>{
//                      if(item.id === e.target.id){
//                          item.content = newValue;
//                      }
//                      return item;
//                  });
//                  localStorage.setItem("notes", JSON.stringify(newData));
//                  return newData;
//              });
//              return newValue;
//         });
//     }

//   return <textarea className="editor" value={props.markdown} id={props.userId} onChange={changeContent}></textarea>;
// };

// export default Write;


import React, {useState, useEffect} from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "./write.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Write = (props) => {
  // const [value, setValue] = useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = useState("write");

  useEffect(() => {
    // Update local storage whenever markdown content changes
    const userId = props.userId;
    const notes = JSON.parse(localStorage.getItem('notes'));
    const existingNoteIndex = notes.findIndex((note) => note.id === userId);

    if (existingNoteIndex !== -1) {
      // If note with the given id exists, update its content
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex].content = props.markdown;
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  }, [props.markdown, props.userId]);

  return (
    <div className="container">
      <ReactMde
        value={props.markdown}
        onChange={props.setMarkdown}
        id={props.userId}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
      </div>
      );
};

export default Write;
