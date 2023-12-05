import React, { useState, useEffect } from "react";
import moment from "moment";

function PopupThread({ popUpFeedThread }) {
  const [user, setUser] = useState(null)
  const timePassed = moment().startOf('day').fromNow(popUpFeedThread.timestamp)

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${popUpFeedThread.thread_from}`)
      const data = await response.json()
      setUser(data[0])
    } catch(error) {
       console.log(error)
    }

  }
  useEffect(()=> {
    getUser()
  }, [])
  
  return (
    <article className="feed-card">
      <div className="text-container">
        <div>
          <div className="img-container">
            <img src={user?.img} alt="profile avatar" />
          </div>
          <div>
            <p>
              <strong>{user?.handle}</strong>
            </p>
            <p>{popUpFeedThread.text}</p>
          </div>
        </div>
        <p className="sub-text">{timePassed}</p>
      </div>
    </article>
  );
}

export default PopupThread;
