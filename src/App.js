import './App.css';
import React, { Component } from 'react';
import TOC from './components/TOC'
import Subject from './components/Subject'
import Content from './components/Content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode:"welcome",
      selected_content_id:0,
      subject: {title:"WEB", sub:"world wide web!"},
      welcome: {title:"Welcome", desc:"Hello, React!"},
      contents: [
        {id:1, title:"HTML", desc:"HTML is HyperText Markup Language."},
        {id:2, title:"CSS", desc:"HTML is for design."},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive."}
      ]
    }
  }

  render() {
    let _title, _desc;
    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === "read") {

      let hasId = function(content) {
        return content.id === this.state.selected_content_id
      }.bind(this);

      let selected_content = this.state.contents.filter(hasId)[0];
      _title = selected_content.title;
      _desc = selected_content.desc;
    }

    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onPageChange={function() {
          this.setState({mode:"welcome"})
        }.bind(this)}>
        </Subject>
        <TOC 
        data={this.state.contents}
        onPageChange={function(id) {
          this.setState({
            mode:"read",
            selected_content_id:Number(id)
          });
        }.bind(this)}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }   
}

export default App;
