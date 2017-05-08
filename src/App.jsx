import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'
const uuid = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anon" },
      messages: [],
      userCount: 0
    }
    this.wss = new WebSocket("ws://localhost:3001/");
    this.wss.onmessage = (event) => {
      var msg = JSON.parse(event.data);
      switch (msg.type) {
        case "incomingMessage":
          let messages = this.state.messages.concat(msg)
          this.setState({ currentUser: { name: msg.username } });
          this.setState({ messages: messages });
          break;
        case "incomingNotification":
          messages = this.state.messages.concat(msg)
          this.setState({ currentUser: { name: msg.username } });
          this.setState({ messages: messages });
          break;
        case 'userChange':
          messages = this.state.messages.concat(msg)
          this.setState({ messages: messages });
          this.setState({ userCount: msg.userCount }, function() {});
          break;
      }
    }
  }

  handleKeyPress = (e) => {
    if (e.key == 'Enter' && (e.target.value)) { // postMessage
      const userInput = e.target.previousSibling.value;
      const userContent = e.target.value;
      const newMessage = {
        type: "postMessage",
        id: uuid(),
        username: userInput,
        content: userContent
      };
      const messages = this.state.messages.concat(newMessage)
      this.wss.send(JSON.stringify(newMessage));
    }
    if (e.key == 'Enter' && (!e.target.value)) { //postNotifcatoin
      var str = this.state.currentUser.name + " changed their name to " + e.target.previousSibling.value
      this.state.currentUser.name = e.target.previousSibling.value;
      const newMessage = {
        type: "postNotification",
        username: e.target.previousSibling.value,
        content: str
      };
      const messages = this.state.messages.concat(newMessage) //do i need this?
      this.wss.send(JSON.stringify(newMessage));
    }
  }

  // postNotification()

  // postMessage()

  // handleChange(e) {}
  // 
  componentDidMount() {
    this.wss.onopen = (e) => {};

    setTimeout(() => {
      const Messager = { id: 1, username: "Christie", content: "What nice thing to say Bob" };
      const messages = this.state.messages.concat(Messager)
      this.setState({ messages: messages })
    }, 1000);
  }

  render() {
    return (
      <div>
          <Nav userChange={this.state.userCount}/>      
        <MessageList messages={this.state.messages} key={this.state.id}/>
        <ChatBar keyPressed={this.handleKeyPress} user={this.state.currentUser} content={this.state.content} onChange={this.handleChange}/>
      </div>
    );
  }
}
export default App;