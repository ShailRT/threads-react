import React from 'react'
import PopupThread from './PopupThread'
import ThreadInput from './ThreadInput'

function Popup({ user, setOpenPopUp, popUpFeedThreads, text, setText, postThread}) {
  return (
    <div className='popup'>
      <p onClick={() => setOpenPopUp(false)}>X</p>
      {popUpFeedThreads?.map(popUpFeedThread => <PopupThread key={popUpFeedThread.id} popUpFeedThread={popUpFeedThread} />)}
      <ThreadInput postThread={postThread} user={user} text={text} setText={setText}/>
    </div>
  )
}

export default Popup