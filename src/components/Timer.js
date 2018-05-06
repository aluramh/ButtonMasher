import React from 'react'
import Button from 'material-ui/Button';

const Timer = ({
  // Actions
  startTimer, stopTimer, setTimerPeriod,
  // Presentation
  maxTime, running, elapsedTime, counter
}) => {
  const maxTimeOptions = [1500, 5000, 10000];

  return (
    <div className="timer-container">
      <div className="count">
        <h2>{running ? 'Running' : 'Stopped'}</h2>
        <table className="table data">
          <tbody>
            <tr>
              <th>Timer period:</th>
              <td>
                <div>
                  {maxTimeOptions.map(mashingTime => 
                    <Button
                      color="primary"
                      variant={maxTime === mashingTime && 'raised'}
                      key={mashingTime} 
                      onClick={() => setTimerPeriod(mashingTime)}
                    >
                      {mashingTime / 1000} s
                    </Button>)}
                </div>
              </td>
            </tr>
            <tr>
              <th>Time elapsed:</th>
              <td>{elapsedTime} ms</td>
            </tr>
            <tr>
              <th>Button presses:</th>
              <td>{counter}</td>
            </tr>
            <tr>
              <th>Speed:</th>
              <td>
                {counter !== 0 && elapsedTime !== 0
                  ? (counter / elapsedTime * 1000).toFixed(2)
                  : 0}&nbsp;B/s
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="controls">
        <button className="btn btn-mushroom green" onClick={startTimer}>{running ? 'Restart' : 'Start'}</button>
        <br/>
        <button className="btn btn-mushroom red" onClick={stopTimer}>Stop</button>
      </div>
    </div>
  )
}

export default Timer