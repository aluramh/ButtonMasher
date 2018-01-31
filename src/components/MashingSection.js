import React from 'react'

const MashingSection = ({addButtonPress, counter}) => {
  return (
    <div className="mashing-container"
      onClick={addButtonPress}
      title="Clicks in this area also count as button presses.">
    </div>
  )
}

export default MashingSection