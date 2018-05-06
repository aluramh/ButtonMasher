import React from 'react'
import Paper from 'material-ui/Paper';

const MashingSection = ({addButtonPress, counter}) => {
  return (
    <Paper className="mashing-container"
      onClick={addButtonPress}
      title="Clicks in this area also count as button presses."
    >
    </Paper>
  )
}

export default MashingSection