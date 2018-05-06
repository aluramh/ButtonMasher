import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import MashingScreen from './MashingScreen'
import GamepadWrapper from './GamepadWrapper'
import Introduction from './Introduction'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 0,
      timeElapsed: 0,
      // For the timer
      // This variable is in ms
      elapsedTime: 0,
      startTime: Date.now(),
      maxTime: 5000,
      // Interval for each time execution.
      interval: 30,
      running: false
    }
  }

  updateCounter = (newCounter) => {
    this.setState({counter: newCounter})
  }

  incrementCounter = () => {
    this.updateCounter(this.state.counter + 1)
  }

  addButtonPress = () => {
    if (this.state.running) {
      this.updateCounter(this.state.counter + 1)
    }
  }

  setTimerPeriod = (val) => {
    this.setState({maxTime: val})
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
    this.updateCounter(0)
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ running: false });
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

  render() {
    return (
      <div className="App">
        <Introduction />
        <MashingScreen
          {...this.state}
          addButtonPress={this.addButtonPress}
          setTimerPeriod={this.setTimerPeriod}
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}>
        </MashingScreen>
        <GamepadWrapper
          startTimer={this.startTimer}
          addButtonPress={this.addButtonPress}
          running={this.state.running}>
        </GamepadWrapper>
      </div>
    );
  }
}

export default App;
