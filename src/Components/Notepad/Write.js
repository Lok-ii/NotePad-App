import React, { useState } from 'react';
import "./write.css";

const Write = (props) => {
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });

    const changeContent = (e)=>{
        props.setMarkdown(()=>{
            let newValue = e.target.value;
            props.setData((prev)=>{
                const newData = prev.map((item)=>{
                     if(item.id === e.target.id){
                         item.content = newValue;
                     }
                     return item;
                 });
                 localStorage.setItem("notes", JSON.stringify(newData));
                 return newData;
             });
             return newValue;
        });

        const { selectionStart, selectionEnd } = e.target;
    setCursorPosition({ start: selectionStart, end: selectionEnd });
    }

  return <textarea className="editor" value={props.markdown} id={props.userId} onChange={changeContent}></textarea>;
};

export default Write;
