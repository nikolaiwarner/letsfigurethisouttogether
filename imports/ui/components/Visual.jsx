import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import '../../../node_modules/tracking/build/tracking-min.js'

export default class Visual extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this._lastProps = {visual: {data: []}}
    setInterval(() => {
      this._lastProps = this.props
    }, 200)
    // setInterval(() => {
    //   if (this._context) {
    //     this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    //   }
    // }, 10)
    setInterval(() => {
      this.setup()
    }, 30000)
  }

  componentDidUpdate(newProps) {
    this.updateWithNewData(newProps)
  }

  componentDidMount() {
    this._canvas = this.refs.canvas // document.getElementById('canvas')
    this._context = this._canvas.getContext('2d')
    this.setup()
  }

  setup() {
    if (this.props.location.query.perfect) {
      this.setState({
        invert: false,
        orbs: !!this.randomInt(0,1),
        lines1: true,
        lines2: true,
        wrong: false,
        colors: this.randomInt(0,1),
      })
    } else {
      this.setState({
        invert: !!this.randomInt(0,1),
        orbs: !!this.randomInt(0,1),
        lines1: !!this.randomInt(0,1),
        lines2: !!this.randomInt(0,1),
        wrong: !!this.randomInt(0,1),
        colors: this.randomInt(0,1),
      })
    }
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  randomEvenInt(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min
    return num % 2 ? num + 1 : num
  }

  randomColor() {
    let colors = ['#ff00ff', '#00FFFF', '#FFFFFF']
    if (this.state.colors) {
      colors.push('#000000')
    }
    return colors[Math.floor(Math.random() * colors.length)];
  }

  updateWithNewData(props) {
    if (props.visual) {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      let dimensions = props.visual.dimensions || {}

      let originalWidth = dimensions.width || 1000
      let originalHeight = dimensions.height || 1000

      let scale = 1
      // if (this._canvas.width  < this._canvas.height) {
        scale = this._canvas.width / originalWidth
      // } else {
      //   scale = this._canvas.height / originalHeight
      // }

      // this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
      let data = props.visual.data || {}
      let corners = props.visual.data || []


      // // add linear gradient
      // var grd = this._context.createLinearGradient(0, 0, 1000, 1000);
      // grd.addColorStop(0, this.randomColor());
      // grd.addColorStop(1, this.randomColor());
      // this._context.fillStyle = grd;
      // this._context.fill();

      if (this.state.colors) {
        this._context.beginPath();
        this._context.rect(0, 0, this._canvas.width, this._canvas.height);
        var grd = this._context.createLinearGradient(0, 0, this._canvas.width, this._canvas.height);
        grd.addColorStop(0, this.randomColor());
        grd.addColorStop(1, this.randomColor());
        this._context.fillStyle = grd;
        this._context.fill();
      }

      // Last Props
      // this._context.beginPath();
      // for (let i = 0; i < this._lastProps.visual.data.length; i += 2) {
      //   let x = this._lastProps.visual.data[i]*scale
      //   let y = this._lastProps.visual.data[i + 1]*scale
      //   this._context.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      //   // this._context.fillRect(this._lastProps.visual.data[i]*scale, this._lastProps.visual.data[i + 1]*scale, (Math.random() * 20), (Math.random()))
      //   // this._context.fillRect(x, y, 2, 2)
      //
      //   this._context.moveTo(this._lastProps.visual.data[i+4]*scale, this._lastProps.visual.data[i+5]*scale);
      //   this._context.bezierCurveTo(x, y, x+this.randomInt(-60, 60), y+this.randomInt(-60, 60),  this._lastProps.visual.data[i+2]*scale, this._lastProps.visual.data[i+3]*scale);
      //   //this._context.bezierCurveTo(x, y, x, y, this._lastProps.visual.data[i+2]*scale, this._lastProps.visual.data[i+3]*scale);
      // }
      // this._context.stroke();
      //
      // Points only
      if (this.state.orbs) {
        for (let i = 0; i < corners.length; i ++) {
          let x = corners[i]*scale
          let y = corners[i + 1]*scale
          // this._context.fillStyle = '#fff'
          // this._context.fillRect(x, y, 2, 2)

          this._context.beginPath();
          this._context.arc(x, y, this.randomInt(5, 25), 0, 2 * Math.PI, false);
          this._context.fillStyle = '#ff00ff' //this.randomColor();
          this._context.fill();
          this._context.stroke();
        }
      }

      // this._context.globalAlpha = this.randomInt(0, 100) / 100
      if (this.state.lines1) {
        this._context.beginPath();
        for (let i = 0; i < corners.length; i += this.randomEvenInt(2, 4)) {
          let x = corners[i]*scale
          let y = corners[i + (this.state.wrong ? 0 : 1)]*scale
          this._context.strokeStyle = this.randomColor()
          this._context.lineWidth = this.randomInt(1, 15);
          // this._context.fillRect(corners[i]*scale, corners[i + 1]*scale, (Math.random() * 20), (Math.random()))
          // this._context.fillRect(x, y, 2, 2)

          // if ((Math.abs(x - corners[i+2]*scale) < 10) || (Math.abs(corners[i+2]*scale - x) < 10)) {
            this._context.moveTo(corners[i+4]*scale, corners[i+5]*scale);
            this._context.bezierCurveTo(x, y, x+this.randomInt(-60, 60), y+this.randomInt(-60, 60),  corners[i+2]*scale, corners[i+3]*scale);
          // }
          //this._context.bezierCurveTo(x, y, x, y, corners[i+2]*scale, corners[i+3]*scale);
        }
        this._context.stroke();
      }
      //
      //
      // // this._context.beginPath();
      // // for (let i = 2; i < corners.length; i += this.randomEvenInt(4, 80)) {
      // //   let x = corners[i]*scale
      // //   let y = corners[i + 1]*scale
      // //   this._context.strokeStyle = '#00FFFF'
      // //   // this._context.fillRect(corners[i]*scale, corners[i + 1]*scale, (Math.random() * 20), (Math.random()))
      // //   // this._context.fillRect(x, y, 2, 2)
      // //
      // //   this._context.moveTo(corners[i+4]*scale, corners[i+5]*scale);
      // //   // this._context.arcTo(x, y, corners[i+2]*scale, corners[i+3]*scale, 30);
      // //   this._context.bezierCurveTo(x, y, x+this.randomInt(-10, 10), y+this.randomInt(-10, 10), corners[i+2]*scale, corners[i+3]*scale);
      // // }
      // // this._context.stroke();
      //
      // // this._context.globalAlpha = this.randomInt(0, 100) / 100
      //
      //
      if (this.state.lines2) {
        if (this._lastProps.visual.data) {
          this._context.beginPath();
          for (let i = 2; i < this._lastProps.visual.data.length; i += this.randomEvenInt(2, 8)) {
            let x = this._lastProps.visual.data[i]*scale
            let y = this._lastProps.visual.data[i + 1]*scale
            this._context.strokeStyle = '#00FFFF'
            // this._context.fillRect(this._lastProps.visual.data[i]*scale, this._lastProps.visual.data[i + 1]*scale, (Math.random() * 20), (Math.random()))
            this._context.fillRect(x, y, 4, 4)
            this._context.lineWidth = this.randomInt(1, 20);

            this._context.moveTo(this._lastProps.visual.data[i+4]*scale, this._lastProps.visual.data[i+5]*scale);
            // this._context.arcTo(x, y, this._lastProps.visual.data[i+2]*scale, this._lastProps.visual.data[i+3]*scale, 30);
            this._context.bezierCurveTo(x, y, x+this.randomInt(-10, 10), y+this.randomInt(-10, 10), this._lastProps.visual.data[i+2]*scale, this._lastProps.visual.data[i+3]*scale);
          }
          this._context.stroke();
        }
      }


      // if (this.state.invert) {
      // }
    }
  }


  invert() {
    var imageData = this._context.getImageData(x, y, this._canvas.width, this._canvas.height);
    var data = imageData.data;

    for(var i = 0; i < data.length; i += 4) {
      // red
      data[i] = 255 - data[i];
      // green
      data[i + 1] = 255 - data[i + 1];
      // blue
      data[i + 2] = 255 - data[i + 2];
    }

    // overwrite original image
    this._context.putImageData(imageData, x, y);
  }


  toggleFullscreen() {
    console.log('toggleFullscreen')
    var el = document.documentElement,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen
    rfs.call(el)
  }

  render() {
    return (
      <div className="visualContainer" onClick={this.toggleFullscreen.bind(this)}>
        <canvas ref="canvas" id="canvas" width="100%" height="100%"></canvas>
      </div>
    )
  }
}

Visual.propTypes = {
  visual: PropTypes.object.isRequired,
}
