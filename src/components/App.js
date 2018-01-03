import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import MashingScreen from './MashingScreen'
import GamepadContainer from './GamepadContainer'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  modifyCounter = (newCounter) => {
    this.setState({counter: newCounter})
  }

  render() {
    return (
      <div className="App">
        <div className="App-background"></div>
        <MashingScreen counter={this.state.counter} modifyCounter={this.modifyCounter} />
        <GamepadContainer counter={this.state.counter} modifyCounter={this.modifyCounter} />
      </div>
    );
  }
}

export default App;
