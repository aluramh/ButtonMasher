import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import './MashingScreen.css';

const MashingSection = ({onClickHandler}) => {
  return (
    <div className="mashing-container"
      onClick={onClickHandler}
      title="Clicks in this area also count as button presses.">
    </div>
  )
}

const Timer = ({
  startClickHandler,
  stopClickHandler,
  running, elapsedTime, counter
}) => {
  return (
    <div className="timer-container">
      <div className="count">
        <h2>{running ? 'Running' : 'Stopped'}</h2>
        <table className="table data">
          <tbody>
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
        <button className="btn btn-mushroom green" onClick={startClickHandler}>{running ? 'Restart' : 'Start'}</button>
        <br/>
        <button className="btn btn-mushroom red" onClick={stopClickHandler}>Stop</button>
      </div>
    </div>
  )
}

class MashingScreen extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    modifyCounter: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      timeElapsed: 0,
      // For the timer
      // This variable is in ms
      elapsedTime: 0,
      startTime: Date.now(),
      maxTime: 5000,
      // Interval for each time execution.
      interval: 30,
      running: false
    };
  }

  addButtonPress = () => {
    if (this.state.running) {
      // Parent global state
      this.props.modifyCounter(this.props.counter + 1)
    }
  }

  startTimer = () => {
    // First stop a timer if there is one:
    clearInterval(this.timer);
    // Then set up and start a new timer.
    this.setState({ startTime: Date.now() });
    this.setState({ elapsedTime: 0 });
    this.timer = setInterval(this.tick, this.state.interval);
    this.setState({ running: true });
    // Parent global state
    this.props.modifyCounter(0)
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ running: false });
  }

  restartTimer = () => {
    this.setState({ startTime: Date.now() });
    clearInterval(this.timer);
  }

  tick = () => {
    // 90f is Luigi's cyclone duration.
    // which equals 1.5s = 1500 ms
    if (this.state.elapsedTime > this.state.maxTime) {
      this.stopTimer();
      console.log(Date.now() - this.state.startTime);
    } else {
      this.setState({
        elapsedTime: Date.now() - this.state.startTime
      })
    }
  }

  render () {
    return (
      <div className="container order-md-1">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Timer
              {...this.state}
              {...this.props}
              startClickHandler={this.startTimer}
              stopClickHandler={this.stopTimer}>
            </Timer>
          </div>
          <div className="col-md-8 order-md-first">
            <MashingSection onClickHandler={this.addButtonPress}></MashingSection>
          </div>
        </div>
      </div>
    );
  }
}

export default MashingScreen;
