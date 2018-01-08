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
    addButtonPress: PropTypes.func.isRequired
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
      const bButton = controller.buttons[2];
      const startButton = controller.buttons[9];

      // Get the status of the buttons.
      const pressed = bButton === 1.0;
      const startPressed = startButton.pressed;

      // Confirms variable is an object before accessing properties.
      // if (typeof(bButton) === "object") {
      //   pressed = bButton.pressed;
      //   bButton = bButton.value;
      // }
    
      // Check only for controller port 4 (= index 0)
      if (controller.index === 0) {
        // If previous state was NOT pressed, then change state to pressed.
        // High rise.
        if (pressed === true && this.state.prevBState === false)  {
          this.props.addButtonPress();
        }
        this.setState({ prevBState: pressed });

        // If start is pressed, restart the timer.
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
      // Fastest human mash is 16 B/s, so a time interval of 500ms supports about 20 B/s.
      // Use Nyquist frequency, so use a 2x faster frequency than the fastest mashing.
      // (https://en.wikipedia.org/wiki/Nyquist_frequency)
      this.setState({scanner: setInterval(this.scangamepads, 250)});
    }
  }

  componentWillUnmount () {
    // Clear the timer
    clearInterval(this.state.scanner);
    this.setState({scanner: null});

    // Clear the window listeners.
    window.removeEventListener("gamepadconnected", this.connecthandler);
    window.removeEventListener("gamepaddisconnected", this.disconnecthandler);
  }

  render () {
    return (
      <div></div>
    );
  }
}

export default GamepadContainer;
