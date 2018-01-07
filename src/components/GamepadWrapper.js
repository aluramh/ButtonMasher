import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GamepadContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // FOR GAMEPAD
      haveEvents: 'ongamepadconnected' in window,
      controllers: {},
      // Maybe use an array of values to update each of the 4 controllers in a GC adapter.
      prevBState: false, // 1 = pressed; 0 = not pressed.
      // Store the last used gamepad
      // let selectedGamepad = 0;
      updateTime: 50, // ms
      // Stores the js interval timer
      scanner: null
    }
  }

  static propTypes = {
    running: PropTypes.bool.isRequired,
    incrementCounter: PropTypes.func.isRequired
  }

  connecthandler = (e) => {
    this.addgamepad(e.gamepad);
  }
  
  addgamepad = (gamepad) => {
    const newGamepadsObject = { ...this.state.controllers };    
    newGamepadsObject[gamepad.index] = gamepad;
    this.setState({ controllers: newGamepadsObject });

    requestAnimationFrame(this.updateStatus);
  }
  
  disconnecthandler = (e) => {
    this.removegamepad(e.gamepad);
  }

  removegamepad = (gamepad) => {
    delete this.state.controllers[gamepad.index];
  }

  scangamepads = () => {
    const gamepads = navigator.getGamepads
      ? navigator.getGamepads() 
      : (
        navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads() 
        : []
      );
    for (var i = 0; i < gamepads.length; i++) {
      if (gamepads[i]) {
        if (gamepads[i].index in this.state.controllers) {          
          const newGamepadsObject = {
            ...this.state.controllers,
            [gamepads[i].index]: gamepads[i]
          };

          this.setState({ controllers: newGamepadsObject });
        } else {
          this.addgamepad(gamepads[i]);
        }
      }
    }
  }

  updateStatus = () => {
    if (!this.state.haveEvents) {
      this.scangamepads();
    }
  
    for (let j in this.state.controllers) {
      const controller = this.state.controllers[j];
      var bButton = controller.buttons[2];
      var pressed = bButton === 1.0;

      var startButton = controller.buttons[9];
      var startPressed = startButton.pressed;

      if (typeof(bButton) === "object") {
        pressed = bButton.pressed;
        bButton = bButton.value;
      }

    
      // If previous state was NOT pressed, then change state to pressed.
      // High rise.
      if (controller.index === 0) {
        if (pressed === true && this.state.prevBState === false)  {
          if (this.props.running) this.props.incrementCounter();
        }
        this.setState({ prevBState: pressed });
        if (startPressed) {
          this.props.startTimer()
        }
      }
    }
    // Request a new update in "updateTime" ms
    setTimeout(() => requestAnimationFrame(this.updateStatus), this.state.updateTime);
  }

  componentDidMount () {
    window.addEventListener("gamepadconnected", this.connecthandler);
    window.addEventListener("gamepaddisconnected", this.disconnecthandler);

    if (!this.state.haveEvents) {
      // Fastest human mash is 16 B/s, so a time interval of 500ms supports
      // about 20 B/s.
      this.setState({scanner: setInterval(this.scangamepads, 500)});
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.scanner);
    this.setState({scanner: null});
  }

  render () {
    return (
      <div></div>
    );
  }
}

export default GamepadContainer;
