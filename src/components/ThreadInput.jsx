import React from 'react'

function ThreadInput({user, text, setText, postThread}) {
  return (
    <>
    <p>{user.handle}</p>
    <input value={text} onChange={e => setText(e.target.value)} />
    <button onClick={postThread} className='primary'>Post</button>
    </>
  )
}

export default ThreadInput