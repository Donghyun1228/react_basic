import React, { Component } from 'react'

class CreateContent extends Component {
    render() {
      return(
        <article>
          <form action="/create_process" method="post" 
          onSubmit={function(e) {
            e.preventDefault();
            this.props.onSubmit(
              e.target.title.value,
              e.target.desc.value
            );
          }.bind(this)}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <p><textarea name="desc" placeholder="description"></textarea></p>
            <input type="submit"></input>
          </form>
        </article>
      );
    }
  }

  export default CreateContent