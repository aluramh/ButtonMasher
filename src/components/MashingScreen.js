import React from 'react';
import PropTypes from 'prop-types'; // ES6
import './MashingScreen.css';

import Timer from './Timer';
import MashingSection from './MashingSection'

const MashingScreen = (props) => {
  const { addButtonPress, counter } = props

  return (
    <div className="mashing-page-container container order-md-1">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Timer {...props}></Timer>
        </div>
        <div className="col-md-8 order-md-first">
          <MashingSection addButtonPress={addButtonPress} counter={counter}/>
        </div>
      </div>
    </div>
  );
}

MashingScreen.propTypes = {
  // Functions
  setTimerPeriod: PropTypes.func.isRequired,
  addButtonPress: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,

  // State
  counter: PropTypes.number.isRequired,
  timeElapsed: PropTypes.number.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  maxTime: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired
};

export default MashingScreen;
