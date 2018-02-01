import React, { Component } from 'react'
import './Introduction.css'

const IntroductionContent = ({handleClose}) => {
  return (
    <section className="container introduction">
      <div className="jumbotron">
        <div className="jumbotron-close" onClick={handleClose}>X</div>
        <h1 className="display-4">How to use:</h1>
        <p className="lead">This is a simple web app to practice mashing in Smash 4.</p>
        <p className="lead">In order to get started, follow the next steps:</p>
        <ol className="steps">
          <li>Connect a Mayflash Gamecube adapter to your PC in PC mode. This is the only supported Gamecube (GC) adapter at the moment.</li>
          <li>Plug in a GC controller in Port 4 of the adapter.</li>
          <li>Select a time duration for the mashing and either click "Start" or press Start on the GC controller.</li>
          <li>Mash B. Or do mouse clicks inside the square that Luigi is in.</li>
        </ol>
        <hr className="my-4"/>
        <p>The ideal mashing speed should be around 10 B presses per second (B/s). The maximum estimated speed humanly possible is ~16 B/s.</p>
      </div>
    </section>
  )
}

class Introduction extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: true
    }
  }

  toggleIntro = () => {
    this.setState({ show: false })
  }

  render () {
    return (
      <div>
        {this.state.show ? <IntroductionContent handleClose={this.toggleIntro}/> : <div/>}
      </div>
    )
  }
}

export default Introduction
