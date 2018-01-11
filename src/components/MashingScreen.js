import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import './MashingScreen.css';

const MashingSection = ({addButtonPress, counter}) => {
  return (
    <div className="mashing-container"
      onClick={addButtonPress}
      title="Clicks in this area also count as button presses.">
    </div>
  )
}

const Timer = ({
    startTimer,
    stopTimer,
    setTimerPeriod,
    maxTime,
    running, elapsedTime, counter
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
                <div className="btn-group btn-group-toggle">
                  {maxTimeOptions.map(mashingTime => 
                    <label key={mashingTime} 
                      className={`btn btn-secondary ${maxTime === mashingTime ? 'active' : null}`}>
                      <input type="radio" name="mash"
                        value={mashingTime} 
                        checked={maxTime === mashingTime} 
                        onChange={setTimerPeriod} />
                      {mashingTime / 1000} s
                    </label>)}
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

class MashingScreen extends Component {
  static propTypes = {
    // Function props
    setTimerPeriod: PropTypes.func.isRequired,
    addButtonPress: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,

    // Global state props
    counter: PropTypes.number.isRequired,
    timeElapsed: PropTypes.number.isRequired,
    elapsedTime: PropTypes.number.isRequired,
    // startTime: Date.now(),
    maxTime: PropTypes.number.isRequired,
    interval: PropTypes.number.isRequired,
    running: PropTypes.bool.isRequired
  };

  render () {
    const {addButtonPress, counter} = this.props;

    return (
      <div className="mashing-page-container container order-md-1">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Timer {...this.props}></Timer>
          </div>
          <div className="col-md-8 order-md-first">
            <MashingSection addButtonPress={addButtonPress} counter={counter}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MashingScreen;
