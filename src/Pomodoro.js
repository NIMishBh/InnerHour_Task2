import React from 'react';
import './Pomodoro.css'

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

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
  }

  const changeTime = (breakAmount, sessionAmount) => {
    if (breakTime <= 60 && breakAmount < 0) { return }
    setBreakTime((prev) => prev + breakAmount);
    if (sessionTime <= 60 && sessionAmount < 0) { return }
    setSessionTime((prev) => prev + sessionAmount);
    if (!isRunning) {
      setDisplayTime(sessionTime + sessionAmount)
    }
  }

  const controlTime = () => {
    let breakStart = onBreak;
    if (!isRunning) {
      let interval = setInterval(() => {
          setDisplayTime((prev) => {
            if (prev <= 0 && !breakStart) {
              breakStart = true;
              setOnBreak(true)
              return breakTime;
            } else if (prev <= 0 && breakStart) {
              breakStart = false;
              setOnBreak(false);
              return sessionTime;
            }
            return prev - 1;
          });
      }, 1000);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (isRunning) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setIsRunning(!isRunning);
    console.log(!isRunning)
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
            formatTime={formatTime}
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
        <h1>{formatTime(displayTime)}</h1>
        <div className="bottom-margin">
          <button className="button" onClick={controlTime}>
            {isRunning ? ("Pause") : ("Play")}
          </button>
        </div>
        <button className="button" onClick={resetTime}>
          Reset
      </button>
      </div>
    </div>
  )
}

function Length({breakTime, sessionTime, formatTime }) {
  return (
    <div>
      <div className="timer">
        <h4>Break Length:</h4>
        <h4>{formatTime(breakTime)}</h4>
      </div>
      <div className="timer">
        <h4>Session Length:</h4>
        <h4>{formatTime(sessionTime)}</h4>
      </div>
    </div>
  )
}
export default Pomodoro
