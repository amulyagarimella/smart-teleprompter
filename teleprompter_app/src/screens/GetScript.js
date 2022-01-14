// import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
// import './index.css'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class GetScript extends Component {
  state ={
    script: "",
  }

  onButtonClicked = (value) => {
    client.send(JSON.stringify({
      type: "message",
      msg: value,
    }));
    this.props.history.push({
      pathname: "/prompter",
      state: { left: this.state.script }
    });
  }

  handleChange = (event) => {
      this.setState({script: event.target.value});
  }

  componentDidMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.word}</p>
        <p>Paste your script here:</p>
        <form id="form">
          <textarea value={this.state.script} rows="20" cols="50" onChange={this.handleChange}/>
        </form>
        <button onClick={() => this.onButtonClicked(this.state.script)}>Submit script</button>
      </div>
    )
  }
}

export default GetScript;