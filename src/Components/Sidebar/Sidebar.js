import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./sidebar.css";

const Sidebar = (props) => {
  const addNewNote = () => {
    // props.empty(false);
    localStorage.setItem("empty", false);
    props.setData((prev) => {
      let newData = [
        ...prev,
        {
          id: uuidv4(),
          title: "Enter Title Here",
          content: "# Enter Content Here",
        },
      ];
      localStorage.setItem("notes", JSON.stringify(newData));
      return newData;
    });
  };

  const noteDelete = (e) => {
    props.setData(() => {
      let filteredData = JSON.parse(localStorage.getItem("notes"));
      filteredData = filteredData.filter((data) => {
        return e.target.id !== data.id;
      });
      localStorage.setItem("notes", JSON.stringify(filteredData));
      if(filteredData.length === 0){
        props.empty(true);
        localStorage.removeItem("notes");
      }
      return filteredData;
    });
  };

  const changeTitle= (e)=>{
    props.setData(() => {
        let changedData = JSON.parse(localStorage.getItem("notes"));
        changedData = changedData.map((data) => {
          if(data.id === e.target.title){
            data.title = e.target.value;
          }
          return data;
        });
        localStorage.setItem("notes", JSON.stringify(changedData));
        return changedData;
      });
  }

const changeThings = (e)=>{
    props.userId(e.target.title);

    props.setMarkdown(()=>{
        let markDownData = JSON.parse(localStorage.getItem("notes"));
        markDownData = markDownData.find((data)=>data.id===e.target.title);
        return markDownData.content;
    });
}

  return (
    <div className="sidebar">
      <div className="addNotes">
        <p>NOTES</p>
        <button className="addButton" onClick={addNewNote}>
        <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="notesList">
        {props.data.map((note) => {
          return (
            <div className="note">
              <input value={note.title} onInput={changeTitle}  onClick={changeThings} className="noteTitle" title={note.id} />
              <i
                className="fa-solid fa-trash deleteNote"
                id={note.id}
                onClick={noteDelete}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
