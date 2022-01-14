import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class Prompter extends Component {
  constructor(props) {
    super(props);
    this.state ={
      // script: "",
      done: "",
      left: "",
      // word: "",
    };
    this.myRef = React.createRef();
  }

  componentDidMount() {
    client.send(JSON.stringify({
        type: "message",
        msg: "ready to display",
    }));
    this.setState({left: this.props.location.state.left});
    // alert("Mounted.");
    // client.onopen = () => {
    //   console.log('WebSocket Client Connected');
    // };
   // TODO fix!!!! 
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Got a message! ', dataFromServer);
      let progress = JSON.parse(dataFromServer.msg);
      console.log(progress);
      this.setState((state) =>
        ({ done: progress.said, left: progress.to_say}));
        this.executeScroll();
    };
  }
  executeScroll () {
    this.myRef.current.scrollIntoView()
  }

  render() {
    return (
      <div>
        <span id="done">{this.state.done}</span>
        <span id="left" ref={this.myRef}>{this.state.left}</span>
      </div>
      )
  }
  
}

export default Prompter;