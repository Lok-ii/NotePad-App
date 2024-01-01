import React from 'react';
import "./write.css";

const Write = (props) => {

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
    }

  return <textarea className="editor" value={props.markdown} id={props.userId} onChange={changeContent}></textarea>;
};

export default Write;
