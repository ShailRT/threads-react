import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import Popup from "./components/Popup";
import WriteIcon from "./components/WriteIcon";

function App() {
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState(null);
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true);
  const [filteredThreads, setFilteredThreads] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [interatingThreads, setInteratingThreads] = useState(null);
  const [popUpFeedThreads, setPopUpFeedThreads] = useState(null);
  const [text, setText] = useState("");

  const userId = "20444525-69d9-429e-8e2d-bdce76dd9a7a";

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?user_uuid=${userId}`
      );
      const data = await response.json();
      setUser(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?thread_from=${userId}`
      );
      const data = await response.json();
      setThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(
        (thread) => thread.reply_to === null
      );
      standAloneThreads ? setFilteredThreads(standAloneThreads) : null;
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(
        (thread) => thread.reply_to !== null
      );

      replyThreads ? setFilteredThreads(replyThreads) : null;
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/threads?reply_to=${interatingThreads?.id}`
      );
      const data = await response.json();
      setPopUpFeedThreads(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postThread = async () => {
    const thread = {
      timestamp: new Date(),
      thread_from: user.user_uuid,
      thread_to: user.user_uuid || null,
      reply_to: interatingThreads?.id || null,
      text: text,
      likes: [
      ]
    };
    try {
      const response = await fetch(`http://localhost:3000/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thread),
      });
      const result = await response.json();
      console.log(result);
      getThreads();
      getReplies();
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, [interatingThreads]);

  useEffect(() => {
    getUser();
    getThreads();
  }, []);

  useEffect(() => {
    getThreadsFeed();
  }, [user, threads, viewThreadsFeed]);

  const handleClick = () => {
    setPopUpFeedThreads(null)
    setInteratingThreads(null)
    setOpenPopUp(true)
  }

  return (
    <>
      {user && (
        <div className="app">
          <Nav url={user.instagram_url} />
          <Header
            user={user}
            viewThreadsFeed={viewThreadsFeed}
            setViewThreadsFeed={setViewThreadsFeed}
          />
          <Feed
            user={user}
            filteredThreads={filteredThreads}
            setOpenPopUp={setOpenPopUp}
            getThreads={getThreads}
            setInteratingThreads={setInteratingThreads}
          />
          {openPopUp && (
            <Popup
              user={user}
              setOpenPopUp={setOpenPopUp}
              popUpFeedThreads={popUpFeedThreads}
              text={text}
              setText={setText}
              postThread={postThread}
            />
          )}
          <div onClick={handleClick}>
            <WriteIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
