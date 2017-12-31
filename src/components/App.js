import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.min.js';

import './App.css';
import MashingScreen from './MashingScreen'
import GamepadContainer from './GamepadContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-background"></div>
        <MashingScreen></MashingScreen>
        <GamepadContainer></GamepadContainer>
      </div>
    );
  }
}

export default App;
