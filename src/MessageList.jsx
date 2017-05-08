import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    var conversation;
    conversation = this.props.messages.map(message => <Message key={message.id} username={message.username} content={message.content} type={message.type} id={message.id} userCount={message.userCount} />);
    return(
      <main className="messages" >
        {conversation}
      </main>
    )
  }   
}
export default MessageList;