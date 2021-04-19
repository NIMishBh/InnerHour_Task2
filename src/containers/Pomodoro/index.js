import React from 'react';
import Length from '../../components/Length';
import Timer from '../../components/Timer';
import FormatTime from '../../components/FormatTime';

import './style.css'

function Pomodoro() {

  const [displayTime, setDisplayTime] = React.useState(5)
  const [breakTime, setBreakTime] = React.useState(3)
  const [sessionTime, setSessionTime] = React.useState(5)
  const [isRunning, setIsRunning] = React.useState(false)
  const [onBreak, setOnBreak] = React.useState(false);

  React.useEffect(() => {
    if (displayTime <= 0) {
      setOnBreak(true);
    } else if (!isRunning && displayTime === breakTime) {
      setOnBreak(false);
    }
  }, [displayTime, onBreak, isRunning, breakTime, sessionTime]);

  const changeTime = (breakAmount, sessionAmount) => {
    if (breakTime <= 60 && breakAmount < 0) { return }
    setBreakTime((prev) => prev + breakAmount);
    if (sessionTime <= 60 && sessionAmount < 0) { return }
    setSessionTime((prev) => prev + sessionAmount);
    if (!isRunning) {
      setDisplayTime(sessionTime + sessionAmount)
    }
  }

  const resetTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60)
  }

  return (
    <div>
      <div className="align-center"><h1>Pomodoro Clock</h1></div>
      <div className="grid-container">
        <div class="grid-item">
          <button onClick={() => changeTime(-5 * 60, -25 * 60)} className="button">
            Delete Cycle
        </button>
        </div>
        <div class="grid-item">
          <Length
            changeTime={changeTime}
            breakTime={breakTime}
            sessionTime={sessionTime}
          />
        </div>
        <div class="grid-item">
          <button onClick={() => changeTime(5 * 60, 25 * 60)} className="button">
            Add Cycle
        </button>
        </div>
      </div>
      <div className="align-center">
        {onBreak && <h3>It's Break Time!</h3>}
        <h1><FormatTime time = {displayTime} /></h1>
        <div className="bottom-margin">
          <Timer 
          onBreak = {onBreak}
          isRunning ={isRunning}
          setDisplayTime={setDisplayTime}
          setOnBreak={setOnBreak}
          sessionTime={sessionTime}
          breakTime={breakTime}
          setIsRunning={setIsRunning}
          />
        </div>
        <button className="button" onClick={resetTime}>
          Reset
      </button>
      </div>
    </div>
  )
}
export default Pomodoro
