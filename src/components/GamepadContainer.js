import React, { Component } from 'react';

class GamepadContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // FOR GAMEPAD
      haveEvents: 'ongamepadconnected' in window,
      controllers: {},
      // Maybe use an array of values to update each of the 4 controllers in a GC adapter.
      prevBState: false, // 1 = pressed; 0 = not pressed.
      counter: 0,
      // Store the last used gamepad
      // let selectedGamepad = 0;
      updateTime: 50 // ms
    }
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
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
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
        
      const i = 2; // "B" button
      var val = controller.buttons[i];

      var pressed = val === 1.0;
      if (typeof(val) === "object") {
        pressed = val.pressed;
        val = val.value;
      }
    
      // If previous state was NOT pressed, then change state to pressed.
      // High rise.
      if (controller.index === 0) {
        if (pressed === true && this.state.prevBState === false)  {
          this.setState({ counter: this.state.counter + 1 });

          // document.getElementById("counter").innerHTML = counter;
        }
        this.setState({ prevBState: pressed });
      }
    }
    // Request a new update in "updateTime" ms
    setTimeout(() => requestAnimationFrame(this.updateStatus), this.state.updateTime);
  }

  componentDidMount = () => {
    window.addEventListener("gamepadconnected", this.connecthandler);
    window.addEventListener("gamepaddisconnected", this.disconnecthandler);

    if (!this.state.haveEvents) {
      setInterval(this.scangamepads, 500);
    }
  }

  render () {
    return (
      <div>
        <h1 style={{color: 'white'}}>{this.state.counter}</h1>
      </div>
    );
  }
}

export default GamepadContainer;
