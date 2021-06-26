import React, { Component } from 'react'

class Control extends Component {
  render() {
    return <ul>
      <li><a href="/read" onClick={function(e) {
          e.preventDefault();
          this.props.onChangeMode("read");
      }.bind(this)}>read</a></li>
      <li><a href="/create" onClick={function(e) {
          e.preventDefault();
          this.props.onChangeMode("create");
      }.bind(this)}>create</a></li>
      <li><a href="/update" onClick={function(e) {
          e.preventDefault();
          this.props.onChangeMode("update");
      }.bind(this)}>update</a></li>
      <li><input type="button" value="delete"></input></li>
    </ul>
  }
}

export default Control