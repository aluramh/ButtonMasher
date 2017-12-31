// Functions for handling HTML connections to a gamepad
var haveEvents = 'ongamepadconnected' in window;
var controllers = {};

let prevBState = false; //1 = pressed; 0 = not pressed.
let counter = 0;
// Store the last used gamepad
// let selectedGamepad = 0;
const updateTime = 50; // ms

function connecthandler (e) {
  addgamepad(e.gamepad);
}

function addgamepad (gamepad) {
  controllers[gamepad.index] = gamepad;
  requestAnimationFrame(updateStatus);
}

function disconnecthandler (e) {
  removegamepad(e.gamepad);
}

function removegamepad (gamepad) {
  delete controllers[gamepad.index];
}

function updateStatus () {
  if (!haveEvents) {
    scangamepads();
  }

  for (let j in controllers) {
    const controller = controllers[j];
      
    const i = 2; // "B" button
    var val = controller.buttons[i];
    // MAY NEED TO USE === INSTEAD OF ==
    var pressed = val === 1.0;
    if (typeof(val) === "object") {
      pressed = val.pressed;
      val = val.value;
    }
  
    // If previous state was NOT pressed, then change state to pressed.
    // High rise.
    if (controller.index === 0) {
      if (pressed === true && prevBState === false)  {
        counter++;
        console.log(counter);
        // document.getElementById("counter").innerHTML = counter;
      // If button is not pressed, and previous status is pressed, then change state to unpressed.
      } else if (pressed === false && prevBState === true) {
          prevBState = 0;
      }
      prevBState = pressed;
    }

    // For reading and displaying the Axis values.
    // var axes = d.getElementsByClassName("axis");
    // for (let i = 0; i < controller.axes.length; i++) {
    //   var a = axes[i];
    //   a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
    //   a.setAttribute("value", controller.axes[i] + 1);
    // }
  }
  // Request a new update in "updateTime" ms
  setTimeout(() => requestAnimationFrame(updateStatus), updateTime);
}

function scangamepads () {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i]) {
      if (gamepads[i].index in controllers) {
        controllers[gamepads[i].index] = gamepads[i];
      } else {
        addgamepad(gamepads[i]);
      }
    }
  }
}

export default  {
  scangamepads,
  connecthandler,
  disconnecthandler
}
