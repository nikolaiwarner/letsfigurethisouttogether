import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import '../../../node_modules/tracking/build/tracking-min.js'

export default class Visual extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidUpdate(newProps) {
    this.updateWithNewData()
  }

  componentDidMount() {
    this._canvas = this.refs.canvas // document.getElementById('canvas')
    this._context = this._canvas.getContext('2d')
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  randomEvenInt(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min
    return num % 2 ? num + 1 : num
  }



  updateWithNewData() {
    if (this.props.visual) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      let originalWidth = this.props.visual.dimensions.width
      let originalHeight = this.props.visual.dimensions.height

      let scale = 1
      if (this._canvas.width  < this._canvas.height) {
        scale = this._canvas.width / originalWidth
      } else {
        scale = this._canvas.height / originalHeight
      }


      // this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
      let corners = this.props.visual.data

      // Points only
      for (let i = 0; i < corners.length; i += this.randomEvenInt(2, 80)) {
        let x = corners[i]*scale
        let y = corners[i + 1]*scale
        this._context.fillStyle = '#fff'
        this._context.fillRect(x, y, 1, 1)
      }

      this._context.beginPath();
      for (let i = 0; i < corners.length; i += this.randomEvenInt(2, 80)) {
        let x = corners[i]*scale
        let y = corners[i + 1]*scale
        this._context.strokeStyle = '#ff00ff'
        // this._context.fillRect(corners[i]*scale, corners[i + 1]*scale, (Math.random() * 20), (Math.random()))
        // this._context.fillRect(x, y, 2, 2)

        this._context.moveTo(corners[i+4]*scale, corners[i+5]*scale);
        this._context.bezierCurveTo(x, y, x+this.randomInt(-60, 60), y+this.randomInt(-60, 60),  corners[i+2]*scale, corners[i+3]*scale);
        //this._context.bezierCurveTo(x, y, x, y, corners[i+2]*scale, corners[i+3]*scale);
      }
      this._context.stroke();


      this._context.beginPath();
      for (let i = 2; i < corners.length; i += this.randomEvenInt(4, 80)) {
        let x = corners[i]*scale
        let y = corners[i + 1]*scale
        this._context.strokeStyle = '#00FFFF'
        // this._context.fillRect(corners[i]*scale, corners[i + 1]*scale, (Math.random() * 20), (Math.random()))
        // this._context.fillRect(x, y, 2, 2)

        this._context.moveTo(corners[i+4]*scale, corners[i+5]*scale);
        // this._context.arcTo(x, y, corners[i+2]*scale, corners[i+3]*scale, 30);
        this._context.bezierCurveTo(x, y, x+this.randomInt(-10, 10), y+this.randomInt(-10, 10), corners[i+2]*scale, corners[i+3]*scale);
      }
      this._context.stroke();

    }
  }

  render() {
    return (
      <div className="visualContainer">
        <canvas ref="canvas" id="canvas" width="100%" height="100%"></canvas>
      </div>
    )
  }
}

Visual.propTypes = {
  visual: PropTypes.object.isRequired,
}
