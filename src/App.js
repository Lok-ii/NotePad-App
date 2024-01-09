import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Write from "./Components/Notepad/Write";

function App() {
  const [dataArray, setDataArray] = useState([]);
  const [markdownContent, setMarkdownContent] = useState(
    "# Enter Your Title Here"
  );
  const [userId, setUserId] = useState("");
  const [isEmpty, setEmpty] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem("notes");
    setEmpty(localStorage.getItem("empty"));
    if (storedData && storedData.length !== 0) {
      let parsedData = JSON.parse(storedData);
      setDataArray(parsedData);
      setUserId(parsedData[0].id);
      setMarkdownContent(parsedData[0].content);
      setEmpty(false);
    } else {
      setEmpty(true);
    }

    localStorage.setItem("empty", isEmpty);
  }, [isEmpty]);
  return (
    <div className="mainContent">
      {isEmpty ? (
        <div className="landingPage">
          <div className="landingHeading">
            <p className="welcome">WELCOME TO</p>
            <p className="landingMarkdown">MarkDown Editor</p>
          </div>
          <button
            className="createNote"
            onClick={() => {
              setEmpty(false);
              setDataArray(() => {
                let firstItem = [
                  {
                    title: "Untitled",
                    content: `# Untitled\n\nThis is an untitled note.`,
                    id: uuidv4(),
                  },
                ];

                localStorage.setItem("notes", JSON.stringify(firstItem));
                return firstItem;
              });
            }}
          >
            Create a New Note &#x270d;
          </button>
        </div>
      ) : (
        <div className="App">
          <Sidebar
            data={dataArray}
            setData={setDataArray}
            setMarkdown={setMarkdownContent}
            empty={setEmpty}
            userId={setUserId}
          />
          <main>
            <Write
              markdown={markdownContent}
              setMarkdown={setMarkdownContent}
              userId={userId}
              data={dataArray}
              setData={setDataArray}
            />
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
