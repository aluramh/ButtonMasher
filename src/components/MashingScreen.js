import React, { Component } from 'react';
import gamepad from './gamepad'
import './MashingScreen.css';

class MashingScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // For the mashing
      keyboardPresses: 0,
      timeElapsed: 0,
      // For the timer
      // This variable is in ms
      elapsedTime: 0,
      startTime: Date.now(),
      maxTime: 5000,
      // Interval for each time execution.
      interval: 30,
      running: false,

      // FOR GAMEPAD
      haveEvents: 'ongamepadconnected' in window,
      controllers: {},
      // Maybe use an array of values to update each of the 4 controllers in a GC adapter.
      prevBState: false, // 1 = pressed; 0 = not pressed.
      counter: 0,
      // Store the last used gamepad
      // let selectedGamepad = 0;
      updateTime: 50 // ms
    };

    this.addButtonPress = this.addButtonPress.bind(this);  
    this.tick = this.tick.bind(this);        
    this.startTimer = this.startTimer.bind(this);        
    this.stopTimer = this.stopTimer.bind(this);        
    this.restartTimer = this.restartTimer.bind(this);          
  }

  componentDidMount () {
    window.addEventListener("gamepadconnected", gamepad.connecthandler);
    window.addEventListener("gamepaddisconnected", gamepad.disconnecthandler);

    if (!this.haveEvents) {
      setInterval(gamepad.scangamepads, 500);
    }
  }

  addButtonPress() {
    if (this.state.running) {
      this.setState({ keyboardPresses: this.state.keyboardPresses + 1 })
    }
  }

  startTimer () {
    // First stop a timer if there is one:
    clearInterval(this.timer);
    // Then set up and start a new timer.
    this.setState({ startTime: Date.now() });
    this.setState({ elapsedTime: 0 });
    this.setState({ keyboardPresses: 0 });    
    this.timer = setInterval(this.tick, this.state.interval);
    this.setState({ running: true });    
  }

  stopTimer () {
    clearInterval(this.timer);
    this.setState({ running: false });
  }

  restartTimer () {
    this.setState({ startTime: Date.now() });
    clearInterval(this.timer);
  }

  tick () {
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

  convertMsToS (ms) {
    return (ms / 1000).toFixed(2);
  }

  render() {
    return (
      <div className="mashing">
        <div className="d-flex flex-row">
          <div className="mashing-container" 
            onClick={this.addButtonPress}
            title="Clicks in this area also count as button presses.">
          </div>

          <div className="timer-container">
            <div className="count">
              <h2>{this.state.running ? 'Running' : 'Stopped'}</h2>
              <table className="table data">
                <tbody>
                  <tr>
                    <th>Time elapsed:</th>
                    <td>{this.state.elapsedTime} ms</td>
                  </tr>
                  <tr>
                    <th>Button presses:</th>
                    <td>{this.state.keyboardPresses}</td>
                  </tr>
                  <tr>
                    <th>Speed:</th>
                    <td>
                      {this.state.keyboardPresses !== 0 && this.state.elapsedTime !== 0
                        ? (this.state.keyboardPresses / this.state.elapsedTime * 1000).toFixed(2)
                        : 'N/A'}&nbsp;B/s
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="controls">
              <button className="btn btn-mushroom green" onClick={this.startTimer}>{this.state.running ? 'Restart' : 'Start'}</button>
              <br/>
              <button className="btn btn-mushroom red" onClick={this.stopTimer}>Stop</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MashingScreen;
