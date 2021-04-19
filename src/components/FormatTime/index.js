import React from 'react'

function formatTime({time}) {

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  return (
    <div>
      {(minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)}
    </div>
  )
}

export default formatTime
