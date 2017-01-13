import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { Visuals } from '../../api/visuals.js'
import _ from 'underscore'
import '../../../node_modules/tracking/build/tracking-min.js'

export default class Visual extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimensions: {
        width: 400,
        height: 300
      },
      useCamera: true
    }
    this._lastCorners = []

    // this.setData = _.throttle(this.setData.bind(this), 10)
  }

  setData(data) {
    Meteor.call('visuals.setData', this.props.params._id, {
      data: data,
      dimensions: this.state.dimensions
    })
  }

  componentDidMount() {
    this._canvas = this.refs.canvas
    this._context = this._canvas.getContext('2d')
    let FastTracker = function() {
      FastTracker.base(this, 'constructor')
    }
    tracking.inherits(FastTracker, tracking.Tracker)
    tracking.Fast.THRESHOLD = 10
    FastTracker.prototype.threshold = tracking.Fast.THRESHOLD
    FastTracker.prototype.track = (pixels, width, height) => {
      let gray = tracking.Image.blur(pixels, width, height, 6)
      gray = tracking.Image.grayscale(gray, width, height)
      let corners = tracking.Fast.findCorners(gray, width, height)

      // corners = this.filterCorners(corners)
      // corners = this.mask(corners)
      this.setData(corners)
      this.draw(corners)
    }
    let tracker = new FastTracker()
    tracking.track('#video', tracker, { camera: this.state.useCamera })
  }

  mask(corners) {
    let nextCorners = []
    for (let i = 0; i < corners.length; i += 2) {
      if (corners[i] > 60 && corners[i] < this.state.dimensions.width - 60) {
        nextCorners.push(corners[i])
        nextCorners.push(corners[i+1])
      }
    }
    return nextCorners
  }

  filterCorners(corners) {
    let nextCorners = []
    for (let i = 0; i < corners.length; i += 2) {
      // console.log((this._lastCorners[i] == undefined), (corners[i] > this._lastCorners[i] + 100),  (corners[i] < this._lastCorners[i] - 100))
      if (this._lastCorners[i]) {
        let remove = false
        for (let j = 0; j < this._lastCorners.length; j += 1) {
          if ((corners[i] > this._lastCorners[j] + 200) || (corners[i] < this._lastCorners[j] - 200)) {
            remove = true
            break
          }
        }
        if (!remove) {
          nextCorners.push(corners[i])
          nextCorners.push(corners[i+1])
        }
      } else {
        nextCorners.push(corners[i])
        nextCorners.push(corners[i+1])
      }


        // if (this._lastCorners[i] == undefined || (corners[i] > this._lastCorners[i] + 1)) {
        // nextCorners.push(corners[i])
        // nextCorners.push(corners[i+1])
    }
    this._lastCorners = nextCorners
    return nextCorners
  }

  draw(corners) {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    for (let i = 0; i < corners.length; i += 2) {
      this._context.fillStyle = '#fff'
      this._context.fillRect(corners[i], corners[i + 1], 1, 1)
    }
  }

  render() {
    console.log(this.state.useCamera)
    return (
      <div className="visualContainer">
        <div className="captureFrame">
          <div className="captureContainer">
            {!this.state.useCamera &&
              <video src="/3.mp4" id="video" width={this.state.dimensions.width} height={this.state.dimensions.height} preload autoPlay loop muted controls></video>
            }
            {this.state.useCamera &&
              <video id="video" width={this.state.dimensions.width} height={this.state.dimensions.height} preload autoPlay loop muted></video>
            }
            <canvas ref="canvas" width={this.state.dimensions.width} height={this.state.dimensions.height} ></canvas>
          </div>
        </div>
      </div>
    )
  }
}
