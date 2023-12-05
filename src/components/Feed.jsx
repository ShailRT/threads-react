import React from "react";
import Thread from "./Thread";

function Feed({ user, filteredThreads, setOpenPopUp, getThreads, setInteratingThreads }) {
  return (
    <div className="feed">
      {filteredThreads?.map((filteredThread) => (
        <Thread
          key={filteredThread.id}
          user={user}
          filteredThread={filteredThread}
          setOpenPopUp={setOpenPopUp}
          getThreads={getThreads}
          setInteratingThreads={setInteratingThreads}
        />
      ))}
    </div>
  );
}

export default Feed;
