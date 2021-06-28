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
      mode:"welcome",
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

  getReadContent() {
    let hasId = function(content) {
      return content.id === this.state.selected_content_id
    }.bind(this);

    let selected_content = this.state.contents.filter(hasId)[0];

    return selected_content;
  }

  getContent() {
    let _title, _desc, _article;

    if(this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>

    } else if(this.state.mode === "read") {
      let selected_content = this.getReadContent();
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
          contents:_contents,
          mode:"read",
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>

    } else if(this.state.mode === "update") {
      _article = <UpdateContent 
      data={this.getReadContent()}
      onSubmit={function(_id, _title, _desc) {
        let _contents = Array.from(this.state.contents);
        let i = 0;
        while(i < _contents.length) {
          if(_contents[i].id === _id) {
            _contents[i] = {
              id: _id,
              title: _title,
            desc: _desc
            }
            break;
          }
          i = i + 1;
        }

        this.setState({
          contents:_contents,
          mode:"read"
        });
      }.bind(this)}>
      </UpdateContent>
    }

    return _article
  }

  render() {
    


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
          if(_mode === 'delete') {
            let _contents = Array.from(this.state.contents)
            let i = 0;
            while(i < _contents.length) {
              if(_contents[i].id === this.state.selected_content_id) {
                _contents.splice(i, 1);
                this.setState({
                  mode:"welcome",
                  contents:_contents});
                break;
              }
              i = i + 1;
            }
          }
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
        {this.getContent()}
      </div>
    );
  }   
}

export default App;
