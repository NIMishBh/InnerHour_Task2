import React from 'react';
import FormatTime from '../FormatTime'

function Length({ breakTime, sessionTime, formatTime }) {
  return (
    <div>
      <div className="timer">
        <h4>Break Length:</h4>
        <h4><FormatTime time = {breakTime}/></h4>
      </div>
      <div className="timer">
        <h4>Session Length:</h4>
        <h4><FormatTime time = {sessionTime}/></h4>
      </div>
    </div>
  )
}

export default Length
