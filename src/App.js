import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Sidebar from "./Components/Sidebar/Sidebar";
import Toolbar from "./Components/Toolbar/Toolbar";
import Write from "./Components/Notepad/Write";
import Preview from "./Components/Preview/Preview";

function App() {
  const [isPreview, setPreview] = useState(false);
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
      setEmpty(false);
    } else {
      setEmpty(true);
    }

    localStorage.setItem("empty", isEmpty);
  }, []);
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
            <Toolbar preview={isPreview} setPreview={setPreview} />
            {!isPreview ? (
              <Write
                markdown={markdownContent}
                setMarkdown={setMarkdownContent}
                userId={userId}
                data={dataArray}
                setData={setDataArray}
              />
            ) : (
              <Preview markdown={markdownContent} />
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
