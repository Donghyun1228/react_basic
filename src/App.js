import './App.css';
import React, { Component } from 'react';
import Subject from './components/Subject'
import Control from './components/Control'
import TOC from './components/TOC'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent'
import UpdateContent from './components/UpdateContent';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:"create",
      selected_content_id:1,
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
    let _title, _desc, _article;

    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "read") {

      let hasId = function(content) {
        return content.id === this.state.selected_content_id
      }.bind(this);

      let selected_content = this.state.contents.filter(hasId)[0];
      _title = selected_content.title;
      _desc = selected_content.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if(this.state.mode === "create") {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id = this.max_content_id+1;
        let _contents = this.state.contents.concat({
          id:this.max_content_id,
          title:_title,
          desc:_desc
        });

        this.setState({
          contents:_contents
        });
      }.bind(this)}></CreateContent>

    } else if(this.state.mode === "update") {
      _article = <UpdateContent></UpdateContent>
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
        <Control onChangeMode={function(_mode) {
          this.setState({mode: _mode});
        }.bind(this)}></Control>
        <TOC 
        data={this.state.contents}
        onPageChange={function(id) {
          this.setState({
            mode:"read",
            selected_content_id:Number(id)
          });
        }.bind(this)}></TOC>
        {_article}
      </div>
    );
  }   
}

export default App;
