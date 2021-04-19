import React from 'react'

function Timer({onBreak,isRunning,setDisplayTime,setOnBreak,sessionTime,breakTime,setIsRunning}) {

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
      localStorage.setItem("interval", interval);
    }
    if (isRunning) {
      clearInterval(localStorage.getItem("interval"));
    }
    setIsRunning(!isRunning);
    console.log(!isRunning)
  }

  return (
    <div>
      <button className="button" onClick={controlTime}>
            {isRunning ? ("Pause") : ("Play")}
      </button>
    </div>
  )
}

export default Timer
