import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

export default class VisualsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  createVisual(event) {
    event.preventDefault()
    const name = ReactDOM.findDOMNode(this.refs.textInput).value.trim()
    Meteor.call('visuals.insert', name)
    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  render() {
    return (
      <div className="container">
        {this.props.visuals.map((visual) => {
          return (
            <li key={visual._id}>
              <a href={'/visuals/'+visual._id}>{visual.name}</a> <a href={'/visuals/'+visual._id+'/capture'}>Capture</a>
            </li>
          )
        })}
        <input type='text' ref='textInput' placeholder='Instance name' />
        <button onClick={this.createVisual.bind(this)}>Create New Instance</button>
      </div>
    )
  }
}

VisualsList.propTypes = {
  visuals: PropTypes.array.isRequired,
}
