import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'
import Nav from './Nav.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anon"},
      messages: [],
      connectedUsers: 1
    };

    this.handleNewName = this.handleNewName.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewName(name) {
    const newMessage = {
      type: "postNotification",
      oldName: this.state.currentUser.name,
      newName: name
    };
    if(name !== this.state.currentUser.name){
      this.ws.send(JSON.stringify(newMessage));
      this.setState({currentUser: {name: name}});
    }
  }

  handleNewMessage(message) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: message
    };
    this.ws.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    this.ws = new WebSocket("ws://localhost:3001");
    this.ws.onmessage = (rawMessage) => {
      const message = JSON.parse(rawMessage.data);
      const concatMessage = this.state.messages.concat(message);
      switch(message.type){
        case 'incomingNotification':
          this.setState({messages: concatMessage});
          break;
        case 'incomingMessage':
          this.setState({messages: concatMessage});
          break;
        case 'userCount':
          this.setState({connectedUsers: message.userCount});
          break;
        default:
          throw new Error('Error');
      }
    }
    setTimeout(() => {
      const MockMessage = { id: 1, username: "Christie", content: "How is everyone liking this app", type: "incomingMessage" };
      const messages = this.state.messages.concat(MockMessage)
      this.setState({ messages: messages })
    }, 1000);
        setTimeout(() => {
      const MockMessage = { id: 2, username: "Bob", content: "Seems great to me", type: "incomingMessage" };
      const messages = this.state.messages.concat(MockMessage)
      this.setState({ messages: messages })
    }, 3000);
            setTimeout(() => {
      const MockMessage = { id: 3, username: "Christie", content: "What a nice thing to say Bob", type: "incomingMessage" };
      const messages = this.state.messages.concat(MockMessage)
      this.setState({ messages: messages })
    }, 6000);
                setTimeout(() => {
      const MockMessage = { id: 4, username: "Michael", content: "Bob has always known what's up", type: "incomingMessage" };
      const messages = this.state.messages.concat(MockMessage)
      this.setState({ messages: messages })
    }, 9000);
                    setTimeout(() => {
      const MockMessage = { id: 5, username: "Dylan", content: "We're in agreement then", type: "incomingMessage" };
      const messages = this.state.messages.concat(MockMessage)
      this.setState({ messages: messages })
    }, 11000);
  }


  render() {
    return (
      <div>
        <Nav userCount={this.state.connectedUsers}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar submitName={this.handleNewName} submitMessage={this.handleNewMessage} user={this.state.currentUser.name}/>
      </div>
    );
  }
}
export default App;